const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const Image = require('../models/image');
const Group = require('../models/Group');
const sharp = require('sharp');
const fs = require('fs').promises;
const fsSync = require('fs');

const fetchUser = require('../middlewares/fetchUser');

const galleryDir = path.join(__dirname, '../uploads/gallery');
if (!fsSync.existsSync(galleryDir)) {
  fsSync.mkdirSync(galleryDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/gallery'));
  },
  filename: (req, file, cb) => {
    cb(null, `group_${Date.now()}_${file.originalname}`);
  }
});
const memoryStorage = multer.memoryStorage();
const uploadMemory = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB на файл
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Разрешены только изображения!'), false);
    }
  }
});

// Загрузка группы изображений
router.post('/group', uploadMemory.array('images', 5), async (req, res) => {
  console.log('Received files:', req.files?.map(f => f.originalname));
  
  try {
    const { description } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    if (files.length > 5) {
      return res.status(400).json({ error: 'Максимум 5 изображений' });
    }

    const group = new Group({
      description,
      createdAt: new Date()
    });

    const savedGroup = await group.save();

    const images = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        // Оптимизация и конвертация в WebP
        const webpBuffer = await sharp(file.buffer)
          .resize(1200, 1200, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ 
            quality: 80,
            effort: 6 
          })
          .toBuffer();

        const filename = `group_${savedGroup._id}_${i}_${Date.now()}.webp`;
        const filePath = path.join(galleryDir, filename);
        
        await fs.writeFile(filePath, webpBuffer);

        images.push({
          filePath: `/uploads/gallery/${filename}`,
          groupId: savedGroup._id,
          description,
          mimeType: 'image/webp'
        });

      } catch (processingError) {
        console.error('Ошибка обработки изображения:', processingError);
        // Пропускаем проблемное изображение, но продолжаем обработку остальных
        continue;
      }
    }

    if (images.length === 0) {
      await Group.findByIdAndDelete(savedGroup._id);
      return res.status(500).json({ error: 'Не удалось обработать ни одно изображение' });
    }

    await Image.insertMany(images);

    res.status(201).json({
      message: 'Group uploaded successfully',
      group: savedGroup,
      processedCount: images.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Остальные маршруты остаются без изменений
router.get('/group', async (req, res) => {
  try {
    const groups = await Group.aggregate([
      {
        $lookup: {
          from: 'images',
          localField: '_id',
          foreignField: 'groupId',
          as: 'images'
        }
      },
      { $sort: { createdAt: -1 } }
    ]);
    
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Загрузка изображения
router.post('/', uploadMemory .single('image'), async (req, res) => {
  try {
    if (!req.file) throw new Error('Необходимо загрузить файл.');

    const { description } = req.body;
    const { filename, mimetype } = req.file;

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

// Получение изображений
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().exec();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Получение изображения по имени файла
router.get('/image/:filename', async (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(uploadDirectory, filename);
  try {
    const data = await fs.readFile(imagePath);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(data);
  } catch (error) {
    res.status(500).json({ message: 'Error loading image' });
  }
});

// Обновление изображения
router.put('/:id', uploadMemory .single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const { filename, mimetype } = req.file;

    const image = await Image.findById(id);
    if (!image) throw new Error('Image not found');

    if (filename) {
      image.filePath = path.join(uploadDirectory, filename);
    }

    image.description = description;
    image.mimeType = mimetype;

    await image.save();
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Удаление изображения
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) throw new Error('Image not found');

    const filepath = path.join(__dirname, '..', image.filePath);
    // Убедимся, что файл существует
    if (await fs.exists(filepath)) {
      await fs.unlink(filepath); // Удаление файла
    } else {
      console.warn(`Файл ${filepath} не существует.`);
    }

    await image.remove();
    res.json({ message: 'Изображение успешно удалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Лайк/дизлайк изображения
router.post('/like/:id', fetchUser, async (req, res) => {
  const imageId = req.params.id;
  const userId = req.user.id;

  try {
    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: 'Изображение не найдено' });

    if (image.likes.includes(userId)) {
      image.likes = image.likes.filter(id => id !== userId); // Удаление лайка
    } else {
      image.likes.push(userId); // Добавление лайка
    }

    await image.save();
    res.status(200).json(image);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
router.get('/like/status/:id', fetchUser, async (req, res) => {
  try {
    const imageId = req.params.id;
    const userId = req.user.id;

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: 'Изображение не найдено' });

    const hasLiked = image.likes.includes(userId);

    res.status(200).json({ hasLiked });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
// Удаление лайка изображения
router.delete('/like/:id', fetchUser, async (req, res) => {
  const imageId = req.params.id;
  const userId = req.user.id;

  try {
    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: 'Изображение не найдено' });

    // Если пользователь уже лайкнул изображение, удаляем лайк
    if (image.likes.includes(userId)) {
      image.likes = image.likes.filter(id => id !== userId);
      await image.save();
      res.status(200).json(image);
    } else {
      res.status(400).json({ message: 'Вы не лайкали это изображение' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
