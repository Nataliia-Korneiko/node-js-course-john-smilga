require('express-async-errors');
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const connectDB = require('./db/connect');
const productsRoutes = require('./routes/products');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  DB_CONNECTION,
  PORT = 5000,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

app.use(express.static('./public'));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.use('/api/v1/products', productsRoutes);

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
