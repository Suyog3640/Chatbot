const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('../db/dbConnection');
const router = require('../routes/route');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'https://chatbot-frontend-smoky.vercel.app',
  credentials: true,
}));

app.use(express.json());
app.use('/', router);

// Correct export for Vercel serverless function
module.exports = (req, res) => {
  app(req, res);
};
