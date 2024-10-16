const express = require('express');
const ChatbotService = require('../services/ChatbotService');

const router = express.Router();

router.post('/addChatbot', ChatbotService.createChatbot);
router.post('/addQuestion', ChatbotService.createQuestions)
router.get('/getChatbots', ChatbotService.getChatbots);
router.post('/getQuestions', ChatbotService.getQuestions);

module.exports = router;