const express = require('express');
const UserService = require('../services/UserService');

const router = express.Router();

router.post('/addUser', UserService.createUser);
router.get('/getUsers', UserService.getUsers);
router.post('/login', UserService.login)

module.exports = router;