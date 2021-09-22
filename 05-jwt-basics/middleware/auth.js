const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
require('dotenv').config();

const { JWT_SECRET_KEY } = process.env;

const authentication = async (req, res, next) => {
  // console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // throw new CustomError('No token provided', 401);
    throw new UnauthenticatedError('No token provided');
  }

  const token = authHeader.split(' ')[1];
  // console.log('token:', token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    // console.log('decoded:', decoded);

    const { id, username } = decoded;
    req.user = { id, username }; // для controllers -> dashboard -> msg: `Hello, ${req.user.username}`,
    next();
  } catch (error) {
    // throw new CustomError('Not authorized to access this route', 401);
    throw new UnauthenticatedError('Not authorized to access this route');
  }

  next();
};

module.exports = authentication;
