const jwt = require('jsonwebtoken');
const { SECRET_KEY_DEV } = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError('Необходима авторизация!');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV,
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация!'));
    return;
  }
  req.user = payload;
  next();
};
