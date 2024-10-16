const chat = require("../models/Chat");

exports.createChat = async(req, res) => {
    try {
        const newChat = new chat({chatData: req.body.chatData, userId: req.body.userId});
        await newChat.save();
        res.status(200).json({ message: 'Chat stored successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to stored chat' });
    }
};

exports.getChats = async(req, res) => {
    try {
        const allChats = await chat.find();
        res.json(allChats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get chats' });
    }
};