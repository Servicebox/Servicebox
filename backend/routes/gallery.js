const express = require('express');
const router = express.Router();
const Image = require('../models/image'); // Создайте модель Image, если её ещё нет
const path = require('path');
const fs = require('fs');

// Загрузка изображения в галерею с описанием
router.post('/', async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Необходимо загрузить файл' });
    }

    const { description } = req.body;
    const { filename, mimetype, path: filePath } = req.file;

    const newImage = new Image({
      filePath: `/uploads/gallery/${filename}`,
      description,
      mimeType: mimetype,
      likes: [],
    });

    await newImage.save();

    res.status(201).json({
      message: 'Изображение успешно загружено',
      image: {
        _id: newImage._id,
        filePath: newImage.filePath,
        description: newImage.description,
        mimeType: newImage.mimeType,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;