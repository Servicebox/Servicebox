const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const allowedCors = [
  'https://servicebox35.ru',
  'http://servicebox35.ru',
  'https://servicebox35.pp.ru', 
  'https://servicebox35.ru', // Фронтенд 
  'https://servicebox35.pp.ru', // Бэкенд
  'http://servicebox35.pp.ru',
  'https://servicebox35.pp.ru/services', 
  'http://servicebox35.pp.ru/services', 
  'https://servicebox35.pp.ru/api',
  'http://servicebox35.pp.ru/api', 
  'https://localhost:5000',
  'http://localhost:5000',
  'https://localhost:5000',
  'https://localhost:8000/services',
  'http://localhost:8000/services',
  'http://localhost:8000/products',
  'https://localhost:8000/api/products',
  'http://localhost:8000/api/images',
  'http://localhost:8000/api/images/like',
  'http://localhost:3000/send-request',
  'http://localhost:8000/api/', 
  'http://localhost:8000',
  'http://localhost:5000',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://optfm.ru/api/',
  'http://optfm.ru/api/',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedCors.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes/index');
//const cors = require('./middlewares/cors');
const router = require('./routes/index');

const glassReplacementRoutes = require('./routes/glassReplacementRoutes');

const images = require('./routes/images');
const Image = require('./models/image');

const multer = require('multer');
mongoose.set('strictQuery', true);


module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    const { method } = req;

    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

    const requestHeaders = req.headers['access-control-request-headers'];

    if (method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin');
      
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  return next();
};

app.use(cors(corsOptions));

mongoose
  .connect('mongodb://127.0.0.1:27017/serviceboxdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Соединение с базой данных установлено');
  })
  .catch((error) => {
    console.error('Не удалось подключиться к базе данных', error);
  });

    // Определение модели данных Service после установления соединения
    const Service = mongoose.model('Service', {
      serviceName: String,
      description: String,
      price: String,
      category: String
    });
 

    // Определение модели данных Image после установления соединения


    const uploadDirectory = path.join(__dirname, 'uploads');
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    //contentSecurityPolicy: false,
  })
);
app.use(cookieParser());
const generateClientId = () => `client_${Math.random().toString(36).substring(2, 15)}`;

const getClientId = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; client-id=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};




// Маршрут для запроса client-id
app.get('/get-client-id', (req, res) => {
  let clientId = req.cookies['client-id']; // Получить client-id из куки, если он есть
  if (!clientId) {
      // Если нет, сгенерировать новый client-id
      clientId = generateClientId();
      // Установить куку с именем 'client-id' и значением clientId
      res.cookie('client-id', clientId, {
          httpOnly: true, // Куку можно будет использовать только в HTTP-запросах
          maxAge: 86400 * 1000, // Кука будет валидна 1 день
          sameSite: 'None', // Опция SameSite для кросс-доменных кук
          secure: true // Использование secure если доступ к моему сайту осуществляется через HTTPS
      });
  }
  // Отправляем клиенту его уникальный ID в ответе
  res.json({ clientId });
});

app.use('/api', glassReplacementRoutes);

fs.mkdir(uploadDirectory, { recursive: true }, (err) => {
  if (err && err.code !== 'EEXIST') {
    console.error("Не могу создать папку для загрузок: ", err);
    process.exit(1);
  }
});


app.use('/api/images', images);
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/api/images/like/:id', async (req, res) => {
  try {
    const imageId = req.params.id;
    const clientId = req.cookies['client-id']; // Получаем client-id из кукис

    if (!clientId) {
      return res.status(400).json({ message: "clientId отсутствует в куках." });
    }

    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: "Изображение не найдено." });
    }

    // Проверяем, добавляли ли мы уже лайк от этого clientId
    if (image.likes.includes(clientId)) {
      return res.status(409).json({ message: "Вы уже ставили лайк." });
    }

    // Добавляем clientId в массив лайков
    image.likes.push(clientId);
    await image.save();

    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/images/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({ message: 'Изображение не найдено' });
    }

    res.json({ message: 'Изображение успешно удалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///
app.get('/services', async (req, res) => {
  try {
    const services = await Service.find({}, '_id serviceName description price category ').exec();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/services', async (req, res) => {
  try {
    const { serviceName, description, price, category} = req.body;
    const newService = new Service({ serviceName, description, price, category });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/services/:id', async (req, res) => {
  try {
    const { serviceName, description, price, category } = req.body;
    const updatedService = await Service.findByIdAndUpdate(req.params.id, { serviceName, description, price, category }, { new: true });
    if (updatedService) {
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/services/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (deletedService) {
      res.json({ message: 'Service deleted' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/services/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const services = await Service.find({ category: category });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
        throw new Error('Необходимо загрузить файл.');
    }

    const { path: filePath, mimetype } = req.file;
    const { description } = req.body;
    
    const newImage = new Image({
        filePath: '/uploads/' + path.basename(filePath),
        description,
        mimeType: mimetype,
        likes: []
    });

    const savedImage = await newImage.save();

    res.status(201).json({
        message: 'Изображение успешно загружено',
        image: savedImage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(requestLogger);
// Роут для тестирования обработки ошибок
app.get('/crash-test', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Server will crash now'));
  }, 0);
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);
app.use(limiter);
app.use(errorLogger);
app.use('/', indexRouter);
// Функция для запуска сервера на указанном порту
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on('error', (error) => {
    console.error('Server start error:', error);
  })
  .on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  })
  .on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });
};
// Запуск сервера
startServer();