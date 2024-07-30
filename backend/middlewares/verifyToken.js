const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_ecom';
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token');
    req.admin = decoded; // Сохраняем информацию о пользователе в запросе
    next();
  });
};
module.exports = verifyToken;