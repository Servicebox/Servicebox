//rotes/images

const express = require('express');
const multer = require('multer');
const router = express.Router(); 
const path = require('path');
const Image = require('../models/image');
const fs = require('fs').promises;


// Подключаем контроллеры для обработки изображений
const imagesController = require('../controllers/images');

const uploadDirectory = path.join(__dirname, '../uploads'); 

// Маршруты для работы с изображениями

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Папка для сохранения файлов
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });


  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Разрешить запросы с вашего клиентского origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });  
  
  router.post('/', upload.single('image'), async (req, res) => {
    const tempFilePath = req.file ? req.file.path : null;
    
    try {
        if (!req.file) {
            throw new Error('Необходимо загрузить файл.');
        }
        
        const { description } = req.body;
        const { path, mimetype } = req.file;
        
        const newImage = new Image({
            filePath: path,
            description,
            mimeType: mimetype,
        });

        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        // Попробуйте удалить временный файл вне зависимости от результата операции в блоке try
        if (tempFilePath) {
            try {
                await fs.unlink(tempFilePath);
            } catch (error) {
                console.error(`An error occurred while trying to delete the temporary file: ${error.message}`);
            }
        }
    }
});
  //router.post('/', upload.single('image'), imagesController.createImage);
  router.get('/', imagesController.getImages);

// Добавление заголовка Cross-Origin-Resource-Policy
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
        'Access-Control-Allow-Origin': 'https://servicebox35.pp.ru'
      }); 
      res.end(data);
    });
  });

  router.put('/:id', upload.single('image'), imagesController.updateImage);
  router.delete('/:id', imagesController.deleteImage);
  router.post('/like/:id', imagesController.likeImage);

module.exports = router;