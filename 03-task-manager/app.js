const express = require('express');
const tasksRoutes = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

require('dotenv').config();

const app = express();
const { DB_CONNECTION, PORT = 5000 } = process.env;

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasksRoutes);

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
