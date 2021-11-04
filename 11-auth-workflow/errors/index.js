const CustomError = require('./custom-error');
const NotFoundError = require('./not-found-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
const UnauthorizedError = require('./unauthorized');

module.exports = {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
};
