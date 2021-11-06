const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, JWT_SECRET_KEY);

  return token;
};

const isTokenValid = (token) => jwt.verify(token, JWT_SECRET_KEY);

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } }); // 1d
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } }); // 30d

  const oneDay = 1000 * 60 * 60 * 24; // 1d
  const longerExp = 1000 * 60 * 60 * 24 * 30; // 30d

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    // maxAge: 1000, // expires вместо maxAge
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + longerExp),
    secure: process.env.NODE_ENV === 'production',
  });

  // res.status(statusCode).json({ user, token });
};

// const attachSingleCookieToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user });
//   const oneDay = 1000 * 60 * 60 * 24; // 1d

//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//     signed: true,
//   });
// };

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
