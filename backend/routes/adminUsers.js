// routes/adminUsers.js
const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/Users');

router.get('/users', fetchUser, async (req, res) => {
    try {
        // ТОЛЬКО ДЛЯ АДМИНОВ
        if (req.user.role !== "admin") return res.status(403).json({ message: 'только для администратора' });
        // exclude password, refreshToken, cartData
        const users = await User.find({}, '-password -refreshToken -cartData');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});
module.exports = router;