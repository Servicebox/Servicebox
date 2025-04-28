// routes/userProfile.js
const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/Users');

router.get('/me', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id, '-password -refreshToken -cartData');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;