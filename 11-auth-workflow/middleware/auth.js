const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { isTokenValid, attachCookiesToResponse } = require('../utils');
const Token = require('../models/token');

const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);

      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthenticatedError('Authentication invalid');
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

// authorizePermissions
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }

    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles,
};
