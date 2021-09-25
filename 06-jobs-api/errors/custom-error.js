class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
  }
}

module.exports = CustomError;
