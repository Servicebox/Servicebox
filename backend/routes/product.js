// routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('./models/product');

// Удалить продукт
router.post('/api/removeproduct', async (req, res) => {
  try {
    await Product.findOneAndDelete({ slug: req.body.sslug });
    console.log("Product removed");
    res.json({ success: true, message: "Товар удалён" });
  } catch (error) {
    console.error('Remove product error:', error.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Получить все продукты
router.get('/api/allproducts', async (req, res) => {
  try {
    let products = await Product.find({}, 'id name image category new_price old_price description quantity');
    console.log("All products fetched");
    res.send(products);
  } catch (error) {
    console.error('Fetch allproducts error:', error.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Добавить продукт
router.post('/add/addproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      description: req.body.description,
      quantity: req.body.quantity,
    });

    await product.save();
    console.log("Product saved");
    res.json({ success: true, message: "Товар добавлен" });
  } catch (error) {
    console.error("Error during product addition:", error.message);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

// Обновить продукт
router.put('/add/updateproduct/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        old_price: req.body.old_price,
        new_price: req.body.new_price,
        quantity: req.body.quantity
      },
      { new: true }
    );
    if (updatedProduct) {
      res.json({ success: true, product: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: 'Товар не найден' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

module.exports = router;