const express = require('express');
const ChatService = require('../services/ChatService');

const router = express.Router();

router.post('/addChat', ChatService.createChat);
router.get('/getChats', ChatService.getChats);

module.exports = router;