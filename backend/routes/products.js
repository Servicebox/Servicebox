const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Подключаем модель продукта
const { checkAdmin } = require('../middlewares/checkAdmin'); // Импортируем checkAdmin из middlewares

// Роут для получения всех продуктов из базы
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Роут для добавления нового продукта в базу
router.post('/products', async (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Роут для обновления существующего продукта в базе
router.put('/:id', checkAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.productName = req.body.productName;
      product.description = req.body.description;
      product.price = req.body.price;
      product.category = req.body.category;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;