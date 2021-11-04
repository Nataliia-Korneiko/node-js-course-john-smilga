require('express-async-errors');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const reviewRouter = require('./routes/review');
const orderRouter = require('./routes/order');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();
const { JWT_SECRET_KEY, DB_CONNECTION, PORT = 5000 } = process.env;

app.set('trust proxy', 1); // enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, // limit each IP to 60 requests per windowMs
  })
);
app.use(helmet());
app.use(cors()); // для client на http://localhost:3000
app.use(xss());
app.use(mongoSanitize());
app.use(morgan('tiny'));
app.use(cookieParser(JWT_SECRET_KEY));
app.use(fileUpload());
app.use(express.json());
app.use(express.static('./public'));

// testing cookies router
// после login получаем token в cookies браузера, нажимаем testing и получаем token в console.log
// после logout token в cookies браузера удаляется
app.get('/api/v1', (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(DB_CONNECTION);
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
