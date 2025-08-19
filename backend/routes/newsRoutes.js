const express = require('express');
const router = express.Router();
const multer = require('../config/multer');
const News = require('../models/News');
const fs = require('fs').promises;
const path = require('path');
const { upload: multerUpload, uploadDir } = require('../config/multer');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const rangeParser = require('range-parser');
// Функция сжатия изображения
const compressImage = async (filePath) => {
  const outputPath = filePath.replace(path.extname(filePath), '.webp');
  
  await sharp(filePath)
    .webp({ quality: 80 })
    .toFile(outputPath);

  await fs.unlink(filePath);
  return outputPath;
};

// Функция сжатия видео
const compressVideo = async (filePath) => {
  const outputPath = path.join(
    path.dirname(filePath),
    path.basename(filePath, path.extname(filePath)) + '.mp4'
  );

  await new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .outputOptions([
  '-crf 28',          // Качество (меньше = лучше)
  '-preset ultrafast',// Быстрая конвертация
  '-tune zerolatency',
  '-movflags +faststart',
  '-profile:v baseline', // Совместимость
  '-level 3.0',
  '-pix_fmt yuv420p'  // Формат для всех устройств
])
      .on('end', resolve)
      .on('error', reject)
      .save(outputPath);
  });

  await fs.unlink(filePath);
  return outputPath;
};
const upload = multerUpload.fields([
  { name: 'images', maxCount: 10 },  // До 10 изображений
  { name: 'videos', maxCount: 3 }    // До 3 видео
]);

// Helper для обработки файлов
const processFiles = (files) => {
  const result = {};
  if (files?.images) result.images = files.images.map(f => f.filename);
  if (files?.videos) result.videos = files.videos.map(f => f.filename);
  return result;
};
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: 'Новость не найдена' });
    
    // Возвращаем тип видео
    res.json({
      success: true,
      data: {
        ...news.toObject(),
        videoType: news.videoType // Добавляем тип
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.get('/video/:filename', async (req, res) => {
  try {
    const file = path.join(uploadDir, req.params.filename);
    const stat = await fs.stat(file);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      fs.createReadStream(file, { start, end }).pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(file).pipe(res);
    }
  } catch (error) {
    console.error('Video streaming error:', error);
    res.status(404).send('Video not found');
  }
});

// Создание новости
router.post('/', upload, async (req, res) => {
  try {
    const { title, contentBlocks } = req.body;
    const blocks = JSON.parse(contentBlocks || '[]');
    const files = processFiles(req.files);
    
    // Обработка изображений
    const imagePromises = (files.images || []).map(async (filename) => {
      const filePath = path.join(uploadDir, filename);
      const compressedImage = await compressImage(filePath);
      return path.basename(compressedImage);
    });

    // Обработка видео
    const videoPromises = (files.videos || []).map(async (filename) => {
      const filePath = path.join(uploadDir, filename);
      const compressedVideo = await compressVideo(filePath);
      return {
        filename: path.basename(compressedVideo),
        type: 'video/mp4'
      };
    });

    const [images, videos] = await Promise.all([
      Promise.all(imagePromises),
      Promise.all(videoPromises)
    ]);

    // Сопоставление файлов с блоками
    let imgIndex = 0;
    let vidIndex = 0;
    
    const processedBlocks = blocks.map(block => {
      if (block.type === 'image' && images[imgIndex]) {
        block.media = images[imgIndex++];
        block.mediaType = 'image/webp';
      } else if (block.type === 'video' && videos[vidIndex]) {
        block.media = videos[vidIndex].filename;
        block.mediaType = videos[vidIndex].type;
        vidIndex++;
      }
      return block;
    });

    const news = await News.create({ 
      title, 
      contentBlocks: processedBlocks 
    });
    
    res.status(201).json({ success: true, data: news });
  } catch (error) {
    console.error('News creation error:', error);
    res.status(500).json({ 
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

    const { title, contentBlocks } = req.body;
    const blocks = JSON.parse(contentBlocks);
    const files = req.files;
    
    // Старые файлы для удаления
    const filesToDelete = [];
    
    // Обработка новых изображений
    const imagePromises = (files.images || []).map(async (image) => {
      const filePath = path.join(uploadDir, image.filename);
      const compressedImage = await compressImage(filePath);
      return path.basename(compressedImage);
    });

    // Обработка новых видео
    const videoPromises = (files.videos || []).map(async (video) => {
      const filePath = path.join(uploadDir, video.filename);
      const compressedVideo = await compressVideo(filePath);
      return {
        filename: path.basename(compressedVideo),
        type: 'video/mp4'
      };
    });

    const [newImages, newVideos] = await Promise.all([
      Promise.all(imagePromises),
      Promise.all(videoPromises)
    ]);

    // Сопоставление новых файлов с блоками
    let newImgIndex = 0;
    let newVidIndex = 0;
    
    const updatedBlocks = blocks.map(block => {
      if (block.type === 'image') {
        if (block.media && !block.media.startsWith('new:')) {
          filesToDelete.push(block.media);
        }
        
        if (block.media && block.media.startsWith('new:')) {
          block.media = newImages[newImgIndex++];
          block.mediaType = 'image/webp';
        }
      } else if (block.type === 'video') {
        if (block.media && !block.media.startsWith('new:')) {
          filesToDelete.push(block.media);
        }
        
        if (block.media && block.media.startsWith('new:')) {
          block.media = newVideos[newVidIndex].filename;
          block.mediaType = newVideos[newVidIndex].type;
          newVidIndex++;
        }
      }
      return block;
    });

    // Удаление старых файлов
    await Promise.all(filesToDelete.map(file => 
      fs.unlink(path.join(uploadDir, file)).catch(console.error)
    ));

    // Обновление новости
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        contentBlocks: updatedBlocks 
      },
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updatedNews });
  } catch (error) {
    console.error('News update error:', error);
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

    const deleteOperations = [];
    
    // Удаляем все медиафайлы из блоков
    if (news.contentBlocks) {
      news.contentBlocks.forEach(block => {
        if (block.media) {
          const filePath = path.join(uploadDir, block.media);
          deleteOperations.push(fs.unlink(filePath).catch(console.error));
        }
      });
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