const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  // const { name, email, password } = req.body;

  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email and password');
  // }

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = {
  register,
  login,
};
