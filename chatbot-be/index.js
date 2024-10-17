const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('../db/dbConnection'); // Adjust the path as necessary
const router = require('../routes/route'); // Adjust the path as necessary

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: 'https://chatbot-frontend-smoky.vercel.app', // Change to your frontend URL
  credentials: true,
}));

app.use(express.json());
app.use('/', router);

// Export the Express app as a serverless function
module.exports = app;
