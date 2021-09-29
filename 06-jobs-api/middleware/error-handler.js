const { StatusCodes } = require('http-status-codes');
// const { CustomError } = require('../errors');

const errorHandler = async (error, req, res, next) => {
  let customError = {
    // set default
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || 'Something went wrong, please try again later',
  };

  // if (error instanceof CustomError) {
  //   return res.status(error.statusCode).json({ msg: error.message });
  // }

  if (error.code && error.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST; // 400
  }

  if (error.name === 'ValidationError') {
    customError.msg = Object.values(error.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST; // 400
  }

  // CastError - неверный id (getJob)
  if (error.name === 'CastError') {
    customError.msg = `No item found with id : ${error.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND; // 404
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
