const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_ecom';

// Маршрут для входа администратора
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && await bcrypt.compare(password, admin.password)) {
    const token = jwt.sign({ id: admin._id, isAdmin: true }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Проверка токена
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send('No token provided');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token');
    req.admin = decoded;
    next();
  });
};

// Защищенный маршрут
router.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;