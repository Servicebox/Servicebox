const express = require('express');
const multer = require('multer'); 
const router = express.Router();
const path = require('path');  
const Image = require('../models/image'); 
const fs = require('fs').promises; 

const uploadDirectory = path.join(__dirname, '../uploads');
const imagesController = require('../controllers/images'); // Add this line to import imagesController
const generateClientId = () => `client_${Math.random().toString(36).substring(2, 15)}`;

// Настройки для multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Правильно установленная директория для сохранения
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Формирование имени файла
  }
});

const upload = multer({ storage: storage });

router.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', 'https://servicebox35.ru'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Этот заголовок должен быть установлен
  
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Необходимо загрузить файл.');
    }

    const { description } = req.body;
    const { filename, mimetype } = req.file; // изменено здесь

    const newImage = new Image({
      filePath: path.join(uploadDirectory, filename), // изменено здесь
      description,
      mimeType: mimetype,
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/', imagesController.getImages);

router.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(uploadDirectory, filename);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error loading image');
    }

    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Access-Control-Allow-Origin': 'https://servicebox35.ru'
    });
    res.end(data);
  });
});



router.put('/:id', upload.single('image'), imagesController.updateImage);
router.delete('/:id', imagesController.deleteImage);
router.post('/like/:id', imagesController.likeImage);

module.exports = router;