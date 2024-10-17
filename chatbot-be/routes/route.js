const express = require('express');
const Router = express.Router();

const ChatbotController = require('../controller/ChatbotController');
Router.use('/chatbot', ChatbotController);

const ChatController = require('../controller/ChatController');
Router.use('/chat', ChatController);

const UserController = require('../controller/UserController');
Router.use('/user', UserController);

module.exports = Router;
