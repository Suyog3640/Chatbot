const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChatbotSchema = new Schema({  
    name: String,
    questions:[
        {
            id: String,
            message: String,
            trigger: String,
            user: { type: Boolean, default: false },
            options: [
                {
                    value: String,
                    label: String,
                    trigger: String
                }
            ],
            end: { type: Boolean, default: false }
        }
    ],
    userId: { type: Schema.Types.ObjectId, ref: 'user' } // Reference to the User model
});

module.exports = mongoose.model('chatbot', ChatbotSchema);