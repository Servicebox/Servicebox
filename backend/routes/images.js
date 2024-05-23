//routes/images.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const Image = require('../models/image');
const fs = require('fs').promises;
 
const uploadDirectory = path.join(__dirname, '../uploads'); 

// Настройки для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  } 
});

const upload = multer({ storage: storage });

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://servicebox35.ru');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

router.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Необходимо загрузить файл.');
    }

    const { description } = req.body;
    const { filename, mimetype } = req.file;

    const newImage = new Image({
      filePath: filename,
      description,
      mimeType: mimetype,
    });

    const savedImage = await newImage.save();
    console.log(savedImage);
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/image/:filename', async (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(uploadDirectory, filename);
  try {
    if (await fs.exists(imagePath)) {
      const data = await fs.readFile(imagePath);
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
      });
      res.end(data);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading image');
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const { filename, mimetype } = req.file;

    const image = await Image.findById(id);

    if (!image) {
      throw new Error('Image not found');
    }

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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);

    if (!image) {
      throw new Error('Image not found');
    }

    await image.remove();

    res.status(200).json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/like/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);

    if (!image) {
      throw new Error('Image not found');
    }

    image.likes = image.likes + 1;

    await image.save();

    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;