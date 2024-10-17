const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('../db/dbConnection');
const router = require('../routes/route');

dotenv.config();

const app = express();
connectDB(); // Ensure DB connection logic is correct

app.use(cors({
  origin: 'https://chatbot-frontend-smoky.vercel.app',
  credentials: true,
}));

app.use(express.json());
app.use('/', router);

// Error handling middleware (to prevent crashes)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Export the app as a handler for Vercel
module.exports = (req, res) => app(req, res);
