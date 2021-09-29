require('express-async-errors');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const authenticateUser = require('./middleware/auth');

const app = express();
const { DB_CONNECTION, PORT = 5000 } = process.env;

app.set('trust proxy', 1); // enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api/v1/docs">Documentation</a>');
});

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateUser, jobsRoutes); // authenticateUser - protected routes

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
