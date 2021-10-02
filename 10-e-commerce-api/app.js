require('express-async-errors');
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();
const { DB_CONNECTION, PORT = 5000 } = process.env;

app.use(express.json());
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(DB_CONNECTION);
    app.listen(PORT, console.log(`Server is listening on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
