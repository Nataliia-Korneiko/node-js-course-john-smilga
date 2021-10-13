require('express-async-errors');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const reviewRouter = require('./routes/review');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();
const { JWT_SECRET_KEY, DB_CONNECTION, PORT = 5000 } = process.env;

app.use(cors()); // для client на http://localhost:3000
app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser(JWT_SECRET_KEY));
app.use(fileUpload());

// testing cookies router
// после login получаем token в cookies браузера, нажимаем testing и получаем token в console.log
// после logout token в cookies браузера удаляется
app.get('/api/v1', (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send('Hello');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);

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
