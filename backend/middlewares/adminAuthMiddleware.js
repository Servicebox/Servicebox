// adminAuthMiddleware.js
{/*const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not an admin' });
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = adminAuth;*/}