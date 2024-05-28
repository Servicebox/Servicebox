//middlewares/fechUser.js
const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ errors: "Please authenticate" });
  }
  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ errors: "Please authenticate" });
  }
};

module.exports = fetchUser;