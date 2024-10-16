const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({  
    name: String,
    email: String,
    password: String,
    chatbotId: String
});

module.exports = mongoose.model('user', UserSchema);