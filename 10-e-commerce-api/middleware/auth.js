// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const { UnauthenticatedError } = require('../errors');
// require('dotenv').config();

// const { JWT_SECRET_KEY } = process.env;

// const auth = async (req, res, next) => {
//   // check header
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer')) {
//     throw new UnauthenticatedError('No token provided');
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const payload = jwt.verify(token, JWT_SECRET_KEY);

//     // attach the user to the job routes
//     // const user = User.findById(payload.id).select('-password');
//     // req.user = user;

//     req.user = { userId: payload.userId, name: payload.name }; // для controllers
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError('Authentication invalid');
//   }
// };

// module.exports = auth;
