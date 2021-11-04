const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token; // token - название cookie

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  try {
    // const payload = isTokenValid({ token });
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };

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
