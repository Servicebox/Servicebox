const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const News = require('../models/News');

const uploadDir = path.resolve(__dirname, '..', 'uploads');
fs.mkdir(uploadDir, { recursive: true }, (err) => {
  if (err) {
    console.error('Не могу создать папку для загрузок:', err);
  }
});

// Настройка Multer для хранения файлов в указанной директории
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

// Добавление новости
router.post('/api/news', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, content } = req.body;
    let imagePath = '';
    let videoPath = '';

    if (req.files) {
      // Обработка изображения
      if (req.files.image) {
        const image = req.files.image[0];
        imagePath = `/uploads/${image.filename}`;
      }

      // Обработка видео
      if (req.files.video) {
        const video = req.files.video[0];
        videoPath = `/uploads/${video.filename}`;
      }
    }

    const news = await News.create({ title, content, image: imagePath, video: videoPath });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение списка новостей
router.get('/api/news', async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновление новости
router.put('/api/news/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    let imagePath = req.body.image;
    let videoPath = req.body.video;

    if (req.files) {
      if (req.files.image) {
        const image = req.files.image[0];
        imagePath = `/uploads/${image.filename}`;
        // Удаление старого изображения, если оно существует
        const oldNews = await News.findById(id);
        if (oldNews && oldNews.image) {
          fs.unlinkSync(path.join(uploadDir, path.basename(oldNews.image)));
        }
      }

      if (req.files.video) {
        const video = req.files.video[0];
        videoPath = `/uploads/${video.filename}`;
        // Удаление старого видео, если оно существует
        const oldNews = await News.findById(id);
        if (oldNews && oldNews.video) {
          fs.unlinkSync(path.join(uploadDir, path.basename(oldNews.video)));
        }
      }
    }

    const updatedNews = await News.findByIdAndUpdate(id, { title, content, image: imagePath, video: videoPath }, { new: true });
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление новости
router.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);

    if (news.image) {
      fs.unlinkSync(path.join(uploadDir, path.basename(news.image)));
    }
    if (news.video) {
      fs.unlinkSync(path.join(uploadDir, path.basename(news.video)));
    }

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;