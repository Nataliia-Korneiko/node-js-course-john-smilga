const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY, JWT_LIFETIME } = process.env;

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_LIFETIME,
  });

  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, JWT_SECRET_KEY);

const sendResponseWithCookie = ({ res, statusCode, user, options }) => {
  const token = createJWT({ payload: { user }, options });

  const oneDay = 1000 * 60 * 60 * 24; // 1d

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    // secure flag later
  });

  // res.status(statusCode).json({ user, token });
};

module.exports = {
  createJWT,
  isTokenValid,
  sendResponseWithCookie,
};
