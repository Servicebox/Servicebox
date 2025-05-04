// === BACKEND: routes/order.js ===
const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const Order = require('../models/Order');

// User's own orders
router.get("/", fetchUser, async (req, res) => {
    const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
    res.json(orders);
});
// Admin can view any user's orders
router.get("/admin/:userId", fetchUser, async (req, res) => {
    if (req.user.role !== "admin") return res.sendStatus(403);
    const orders = await Order.find({ user: req.params.userId }).sort("-createdAt");
    res.json(orders);
});

module.exports = router;