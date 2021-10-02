require('express-async-errors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripeController = require('./controllers/stripe');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();
const { PORT = 5000 } = process.env;

app.use(cors('*'));
app.use(express.json());
app.use(express.static('./public'));

app.post('/stripe', stripeController);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    app.listen(PORT, console.log(`Server is listening on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
