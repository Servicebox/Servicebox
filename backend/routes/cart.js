{/*
// routes/cart.js
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Product = require('../models/product');
const fetchUser = require('../middlewares/fetchUser');

// Добавление товара в корзину
router.post('/addtocart', fetchUser, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    const strId = String(itemId);

    const product = await Product.findOne({ id: Number(strId) });
    if (!product) return res.status(404).json({ success: false, message: "Товар не найден" });
    if (product.quantity < quantity) return res.status(400).json({ message: "Мало товара на складе" });

    const user = await User.findById(req.user.id);
    const currentQuantity = user.cartData.get(strId) || 0;
    if (currentQuantity + quantity > product.quantity) return res.status(400).json({ message: "Нельзя добавить больше" });

    product.quantity -= quantity;
    await product.save();

    user.cartData.set(strId, currentQuantity + quantity);
    await user.save();

    res.json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});



router.post('/removefromcart', fetchUser, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    const strId = String(itemId);

    const user = await User.findById(req.user.id);
    const currentQuantity = user.cartData.get(strId) || 0;
    if (currentQuantity < quantity) return res.status(400).json({ message: "Нет такого количества" });

    const product = await Product.findOne({ id: Number(strId) });
    if (!product) return res.status(404).json({ message: "Not found" });

    product.quantity += quantity;
    await product.save();

    if (currentQuantity === quantity) user.cartData.delete(strId);
    else user.cartData.set(strId, currentQuantity - quantity);

    await user.save();

    res.json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});


// Получить корзину
router.get('/', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(Object.fromEntries(user.cartData));
});

module.exports = router;
*/}