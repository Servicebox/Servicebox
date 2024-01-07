// routes/product.js
const express = require('express');
const router = express.Router();
const { getProducts, getSectionList, getElementList, getImage } = require('../models/products');

router.get('/products', async (req, res) => {
  try {
    const productList = await getProducts();
    res.json(productList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sections', async (req, res) => {
  try {
    const { limit, page, sectionId, includeSubsection } = req.body;
    const sections = await getSectionList(limit, page, sectionId, includeSubsection);
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/elements', async (req, res) => {
  try {
    const { limit, page, sectionId, includeSubsection, fullUrl, noImage } = req.body;
    const elements = await getElementList(limit, page, sectionId, includeSubsection, fullUrl, noImage);
    res.json(elements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/images', async (req, res) => {
  try {
    const { elementId } = req.body;
    const image = await getImage(elementId);
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;