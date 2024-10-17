const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/dbConnection'); // Correct path to DB connection
const router = require('./routes/route'); // Correct path to routes

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(
  cors({
    origin: 'https://chatbot-frontend-smoky.vercel.app', // Your frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Use routes
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Export the Express app for Vercel
module.exports = (req, res) => {
  app(req, res);
};
