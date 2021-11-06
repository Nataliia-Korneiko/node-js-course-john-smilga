const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
} = require('../utils');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const sendEmail = require('../utils/sendEmail');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0; // только первый юзер в db будет admin
  const role = isFirstAccount ? 'admin' : 'user';

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = 'http://localhost:3000'; // client

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  // const tokenUser = { name: user.name, userId: user._id, role: user.role };
  // const tokenUser = createTokenUser(user);

  // attachCookiesToResponse({ res, user: tokenUser });
  // res.status(StatusCodes.CREATED).json({ user: tokenUser });

  // send verification token back only while testing in postman
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
    // verificationToken: user.verificationToken,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  if (!user.isVerified) {
    throw new UnauthenticatedError('Please verify your email');
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'User logged out' });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Verification failed');
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError('Verification failed');
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email verified' });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};
