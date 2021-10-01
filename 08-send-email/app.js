require('express-async-errors');
require('dotenv').config();
const express = require('express');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const sendEmail = require('./controllers/email');

const app = express();
const { PORT = 5000 } = process.env;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Email Project</h1> <a href="/send">send email</a>');
});

app.get('/send', sendEmail);

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
