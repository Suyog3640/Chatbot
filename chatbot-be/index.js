const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./db/dbConnection');
const router = require('./routes/route');
dotenv.config();

connectDB();
const app = express();


app.use(express.json());

app.use('/', router);

const PORT = 4000; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
