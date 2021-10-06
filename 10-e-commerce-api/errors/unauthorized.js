const { StatusCodes } = require('http-status-codes');
const CustomError = require('./custom-error');

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
