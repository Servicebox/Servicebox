const express = require('express');
const router = express.Router();
const multer = require('../config/multer');
const News = require('../models/News');
const fs = require('fs').promises;
const path = require('path');

const upload = multer.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]);

// Helper для обработки файлов
const processFiles = (files) => {
  const result = {};
  if (files?.image) result.image = files.image[0].filename;
  if (files?.video) result.video = files.video[0].filename;
  return result;
};

router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: 'Новость не найдена' });
    
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// Создание новости
router.post('/', upload, async (req, res) => {
  try {
    const { title, content } = req.body;
    const files = processFiles(req.files);

    const news = await News.create({
      title,
      content,
      ...files
    });

    res.status(201).json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Получение всех новостей
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort('-createdAt');
    res.json({
      success: true,
      count: news.length,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// Обновление новости
router.put('/:id', upload, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: 'Новость не найдена' });

    const { title, content } = req.body;
    const files = processFiles(req.files);

    // Удаление старых файлов
    if (files.image && news.image) {
      await fs.unlink(path.join(uploadDir, news.image));
    }
    if (files.video && news.video) {
      await fs.unlink(path.join(uploadDir, news.video));
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, ...files },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedNews
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Удаление новости
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ error: 'Новость не найдена' });

    // Полный путь к файлам
    const uploadDir = path.resolve(__dirname, '../uploads');
    
    const deleteOperations = [];
    if (news.image) {
      deleteOperations.push(fs.unlink(path.join(uploadDir, news.image)));
    }
    if (news.video) {
      deleteOperations.push(fs.unlink(path.join(uploadDir, news.video)));
    }

    await Promise.all(deleteOperations);
    
    res.json({ 
      success: true,
      message: 'Новость успешно удалена'
    });
  } catch (error) {
    console.error('Ошибка удаления:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера при удалении'
    });
  }
});

module.exports = router;