const express = require('express')
const router = express.Router()


const ctrlTelegram = require('../api/telegramMsg');
router.post('/telegram', ctrlTelegram.sendMsg);

const getProducts = require('../api/api')
router.post('/products', async (req, res) => {
    try {
      const productList = await getProducts();
      res.json(productList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;