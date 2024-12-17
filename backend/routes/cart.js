{/*
// routes/cart.js
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Product = require('../models/Product');
const fetchUser = require('../middlewares/fetchUser');

// Добавление товара в корзину
router.post('/addtocart', fetchUser, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ success: false, message: "Некорректное количество." });
    }

    const product = await Product.findOne({ id: itemId });
    if (!product) {
      return res.status(404).json({ success: false, message: "Товар не найден." });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ success: false, message: "Нельзя добавить больше, чем доступно на складе." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Пользователь не найден." });
    }

    const currentQuantity = user.cartData.get(itemId) || 0;
    if (currentQuantity + quantity > product.quantity) {
      return res.status(400).json({ success: false, message: "Нельзя добавить больше, чем доступно на складе." });
    }

    // Обновляем количество товара и корзину
    product.quantity -= quantity;
    await product.save();

    user.cartData.set(itemId, currentQuantity + quantity);
    await user.save();

    res.json({ success: true, message: "Товар добавлен в корзину." });
  } catch (error) {
    console.error('Ошибка при добавлении в корзину:', error.message);
    res.status(500).json({ success: false, message: "Ошибка сервера." });
  }
});

router.post('/removefromcart', fetchUser, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ success: false, message: "Некорректное количество." });
    }

    const product = await Product.findOne({ id: itemId });
    if (!product) {
      return res.status(404).json({ success: false, message: "Товар не найден." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Пользователь не найден." });
    }

    const currentQuantity = user.cartData.get(itemId) || 0;
    if (currentQuantity < quantity) {
      return res.status(400).json({ success: false, message: "Нельзя удалить больше, чем имеется в корзине." });
    }

    // Обновляем количество товара и корзину
    product.quantity += quantity;
    await product.save();

    if (currentQuantity === quantity) {
      user.cartData.delete(itemId);
    } else {
      user.cartData.set(itemId, currentQuantity - quantity);
    }
    await user.save();

    res.json({ success: true, message: "Товар удален из корзины." });
  } catch (error) {
    console.error('Ошибка при удалении из корзины:', error.message);
    res.status(500).json({ success: false, message: "Ошибка сервера." });
  }
});


module.exports = router;
*/}