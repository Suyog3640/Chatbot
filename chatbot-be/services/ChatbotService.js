const chatbot = require("../models/Chatbot");
const user = require("../models/User");

exports.createChatbot = async(req, res) => {
    const { name, userId } = req.body;

    try {
        const newChatbot = new chatbot({name: name, userId: userId});
        await newChatbot.save();

        await user.findByIdAndUpdate(userId,{ chatbotId: newChatbot._id });

        res.status(200).json({ message: 'Chatbot created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create question' });
    }
};

exports.createQuestions = async(req, res) => {
    const { chatbotId, question } = req.body;

    try {
        const chatbotDocument = await chatbot.findOneAndUpdate(
            { _id: chatbotId },
            { $push: { questions: question } },  // Push the question
            { new: true, useFindAndModify: false }
        );

        if (!chatbotDocument) {
            return res.status(404).json({ error: 'Chatbot not found' });
        }

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

