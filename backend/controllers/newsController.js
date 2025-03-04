const News = require('../models/News');
const fs = require('fs');
const path = require('path');
const uploadDir = path.resolve(__dirname, '..', 'uploads');

// Добавление новости
exports.createNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    let imagePath = '';
    let videoPath = '';

    if (req.files) {
      // Обработка изображения
      if (req.files.image) {
        const image = req.files.image;
        const imageName = `${Date.now()}_${image.name}`; // Уникальное имя файла
        imagePath = `/uploads/${imageName}`;
        await image.mv(path.join(uploadDir, imageName));
      }

      // Обработка видео
      if (req.files.video) {
        const video = req.files.video;
        const videoName = `${Date.now()}_${video.name}`; // Уникальное имя файла
        videoPath = `/uploads/${videoName}`;
        await video.mv(path.join(uploadDir, videoName));
      }
    }

    const news = await News.create({ title, content, image: imagePath, video: videoPath });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение списка новостей
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление новости
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    let imagePath = req.body.image;
    let videoPath = req.body.video;

    if (req.files) {
      if (req.files.image) {
        const image = req.files.image;
        imagePath = `/uploads/${image.name}`;
        image.mv(path.resolve(__dirname,'uploads', image.name), (err) => {
          if (err) throw err;
        });
      }
      if (req.files.video) {
        const video = req.files.video;
        videoPath = `/uploads/${video.name}`;
        video.mv(path.resolve(__dirname,'uploads', video.name), (err) => {
          if (err) throw err;
        });
      }
    }

    const updatedNews = await News.findByIdAndUpdate(id, { title, content, image: imagePath, video: videoPath }, { new: true });
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление новости
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);

    if (news.image) {
      fs.unlinkSync(path.resolve(__dirname, 'uploads', path.basename(news.image)));
    }
    if (news.video) {
      fs.unlinkSync(path.resolve(__dirname, 'uploads', path.basename(news.video)));
    }

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};