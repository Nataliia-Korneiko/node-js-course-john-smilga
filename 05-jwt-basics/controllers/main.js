const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');
require('dotenv').config();

// check username, password in post(login) request
// if exist create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dashboard

const { JWT_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // just for demo, normally provided by db
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value
  const token = jwt.sign({ id, username }, JWT_SECRET_KEY, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user logged in', token });
};

const dashboard = async (req, res) => {
  // console.log('user:', req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
