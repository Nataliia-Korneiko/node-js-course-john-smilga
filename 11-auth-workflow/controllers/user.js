const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require('../errors');

const getAllUsers = async (req, res) => {
  // console.log(req.user);
  const users = await User.find({ role: 'user' }).select('-password');

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).select('-password');

  if (!user) {
    throw new NotFoundError(`No user with id : ${id}`);
  }

  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const { user } = req;
  res.status(StatusCodes.OK).json({ user });
};

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;
//   const { userId } = req.user;

//   if (!email || !name) {
//     throw new BadRequestError('Please provide all values');
//   }

//   const user = await User.findOneAndUpdate(
//     { _id: userId },
//     {
//       email,
//       name,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   const tokenUser = createTokenUser(user);

//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };

// update user with user.save()
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  const { userId } = req.user;

  if (!email || !name) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ _id: userId });

  user.email = email;
  user.name = name;
  await user.save();

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide both values');
  }

  const user = await User.findOne({ _id: userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Password updated' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
