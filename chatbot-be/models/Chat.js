const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChatSchema = new Schema({  
    chatData:{
        type:[{
            stepId: String,
            message: String,
        }]
    },
    userId: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('chat', ChatSchema);