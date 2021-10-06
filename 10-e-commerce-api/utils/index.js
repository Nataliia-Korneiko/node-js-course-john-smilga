const { createJWT, isTokenValid, sendResponseWithCookie } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const checkPermissions = require('./checkPermissions');

module.exports = {
  createJWT,
  isTokenValid,
  sendResponseWithCookie,
  createTokenUser,
  checkPermissions,
};
