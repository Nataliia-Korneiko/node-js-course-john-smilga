const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors');

const errorHandler = async (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ msg: error.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: 'Something went wrong, please try again' });
};

module.exports = errorHandler;
