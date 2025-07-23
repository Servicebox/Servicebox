// routes/userProfile.js
const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/Users');

router.get('/profile', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, '-password -refreshToken');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Все пользователи (для админа)
router.get('/all', fetchUser, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Нет доступа" });
    const users = await User.find({}, '-password');
    res.json(users);
});

module.exports = router;