const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./db/dbConnection');
const router = require('./routes/Route');
dotenv.config();

connectDB();
const app = express();

const corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests globally
app.options('*', cors(corsOptions));
app.use(express.json());

app.use('/', router);

const PORT = 4000; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

