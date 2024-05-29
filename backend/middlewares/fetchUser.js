//middlewares/fechUser.js
const jwt = require('jsonwebtoken');

const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  console.log('Received token:', token); // Логирование токена
  if (!token) {
    return res.status(401).send({ errors: "пожалуйста, пройдите аутентификацию" });
  }
  try {
    const data = jwt.verify(token, 'secret_ecom');
    console.log('Decoded data:', data); // Логирование результата декодирования
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message); // Логирование ошибки декодирования
    return res.status(401).send({ errors: "пожалуйста, пройдите аутентификацию" });
  }
};
module.exports = fetchUser;