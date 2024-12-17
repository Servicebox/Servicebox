//routes/images.js
const express = require('express'); 
const multer = require('multer');
const router = express.Router();
const path = require('path');
const Image = require('../models/image');
const fetchUser = require('../middlewares/fetchUser');
const fs = require('fs').promises;

const uploadDirectory = path.join(__dirname, '../uploads/gallery');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); 
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Загрузка изображения
router.post('/',  upload.single('image'), async (req, res) => {
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

router.put('/:id', upload.single('image'), async (req, res) => {
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

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const filepath = path.join(__dirname, '..', image.filePath);

        try {
            await fs.access(filepath);
            await fs.unlink(filepath);
        } catch (error) {
            console.warn(`Файл ${filepath} не существует или не может быть удален:`, error);
            // Продолжаем выполнение даже если файл не найден
        }

        const deletedImage = await Image.findByIdAndDelete(id);
        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found in database' });
        }

        res.json({ message: 'Изображение успешно удалено' });
    } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера', error: error.message });
    }
});

// Лайк/дизлайк изображения
// Лайк изображения
router.post('/like/:id', fetchUser, async (req, res) => {
  try {
    const imageId = req.params.id;
    const userId = req.user.id;

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ success: false, message: "Изображение не найдено." });

    if (image.likes.includes(userId)) {
      return res.status(400).json({ success: false, message: "Вы уже поставили лайк этому изображению." });
    }

    image.likes.push(userId);
    await image.save();
    res.json({ success: true, image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.delete('/like/:id', fetchUser, async (req, res) => {
  try {
    const imageId = req.params.id;
    const userId = req.user.id;

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ success: false, message: "Изображение не найдено." });

    if (!image.likes.includes(userId)) {
      return res.status(400).json({ success: false, message: "Вы не ставили лайк этому изображению." });
    }

    image.likes = image.likes.filter(id => id.toString() !== userId);
    await image.save();
    res.json({ success: true, image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


module.exports = router;