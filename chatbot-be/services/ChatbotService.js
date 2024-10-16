const chatbot = require("../models/Chatbot");

exports.createChatbot = async(req, res) => {
    const { name, userId } = req.body; // Expecting id and question details in the request body

    try {
        const newQuestion = new chatbot({name: name, userId: userId});
        await newQuestion.save();

        res.status(200).json({ message: 'Chatbot created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create question' });
    }
};

exports.createQuestions = async(req, res) => {
    const { chatbotId, question } = req.body; // Expecting id and question details in the request body
    console.log(req.body)

    try {
        const chatbotDocument = await chatbot.findOneAndUpdate(
            { _id: chatbotId },
            { $push: { questions: question } },  // Push the question
            { new: true, useFindAndModify: false } // Return the updated document
        );

        if (!chatbotDocument) {
            return res.status(404).json({ error: 'Chatbot not found' });
        }

        // chatbotDocument.questions.push(question);
        await chatbotDocument.save();

        res.status(200).json({ message: 'Questions added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add question' });
    }
};


exports.getChatbots = async(req, res) => {
    try {
        const chatbots = await chatbot.find();
        res.json(chatbots);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get questions' });
    }
}

exports.getQuestions = async(req, res) => {
    const { chatbotId } = req.body;
    try {
        const chatbots = await chatbot.findById(chatbotId);
        res.json(chatbots);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get questions' });
    }
}

