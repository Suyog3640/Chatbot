const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./db/dbConnection');
const router = require('./routes/Route');
dotenv.config();

connectDB();
const app = express();

app.use(cors(
    {
        origin: "https://chatbot-frontend-smoky.vercel.app",
        methods: ["POST", "GET"],
        credentials: true,
        allowedHeaders: 'Content-Type,Authorization',
    }
));
app.use(express.json());

app.use('/', router);

const PORT = 4000; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

