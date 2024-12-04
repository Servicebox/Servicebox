require('dotenv').config();
const express = require('express');
//require('dotenv').config({ path: require('.env') })
console.log(require("dotenv").config())
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const compression = require('compression');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const crypto = require('crypto');
const fetchUser = require('./middlewares/fetchUser');
const glassReplacementRoutes = require('./routes/glassReplacementRoutes');
const imageRoutes = require('./routes/images');
const requestIp = require('request-ip');
const bcrypt = require('bcrypt');
const galleryRoutes = require('./routes/gallery');
const indexRouter = require('./routes/index');
const MONGODB_URI = 'mongodb://127.0.0.1:27017/serviceboxdb';
const JWT_SECRET = process.env.JWT_SECRET || 'secret_ecom';
const router = express.Router();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const Admin = require('./models/Admin');
const adminRoutes = require('./routes/admin');
const verifyToken = require('./middlewares/verifyToken');

const app = express();
//const User = require('./models/Users');
const YANDEX_USER = process.env.YANDEX_USER;
const YANDEX_PASS = process.env.YANDEX_PASS;
const CLIENT_URL = process.env.CLIENT_URL;
app.set('trust proxy', true);
app.use(requestIp.mw());
const PORT = 8000;
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
// Создание API роутера
const apiRouter = express.Router();

// Создаем объект для хранения соответствий сеансов с пользователями Telegram
console.log(process.env)
const http = require('http').createServer(app);
//const emailToken = crypto.randomBytes(64).toString('hex');
const allowedCors = [
  'http://localhost:5173',
'https://servicebox35.pp.ru/get-client-id',
  'http://192.168.1.99:5173',
    'http://localhost:5173',
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
  'https://servicebox35.pp.ru/services',
  'https://servicebox35.pp.ru/products',
  'https://localhost:8000/api/products',
  'https://servicebox35.pp.ru/api/images',
  'https://servicebox35.pp.ru/api/images/like',
  'http://localhost:3000/send-request',
  'https://servicebox35.pp.ru/api/', 
  'https://servicebox35.pp.ru',
  'http://localhost:5000',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://localhost:8000',
  'https://servicebox35.pp.ru',
  'https://optfm.ru/api/',
  'http://optfm.ru/api/',
  'https://servicebox35.pp.ru/uploads',
  'http://localhost:5173',
  'https://servicebox35.pp.ru/addproduct',
  'https://servicebox35.pp.ru/allproducts',
  'https://servicebox35.pp.ru/removeproduct',
  'https://servicebox35.pp.ru/signup',
  'https://servicebox35.pp.ru/signup',
  'http://192.168.1.38:5173',
  'https://servicebox35.pp.ru/popularinpart',
  'https://servicebox35.pp.ru/allproducts',
  'https://servicebox35.pp.ru/newcollections',
  'https://servicebox35.pp.ru/init-payment',
  'http://localhost:3000/init-paymen',
  'https://servicebox35.pp.ru/api/search',
  'https://localhost:8000/products',
  'http://localhost:8000/send',
  'http://localhost:8000/signup',
  'http://smtp.yandex.ru',
  'https://smtp.yandex.ru',
'https://servicebox35.pp.ru/verify-email',
'https://servicebox35.ru/verify-email',
'http://localhost:8000/signup',
  

];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedCors.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};



// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // Разрешаем только этот источник
  methods: ['GET', 'POST'], // Разрешаем определенные методы
  credentials: true, // Указываем, что можно работать с куками
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use('/api', glassReplacementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/admin', adminRoutes);
// База данных

app.use('/api', apiRouter);
mongoose.set('strictQuery', true);
mongoose.connect( MONGODB_URI )
  .then(() => console.log('Соединение с базой данных установлено'))
  .catch((error) => console.error('Ошибка подключения к базе данных:', error));


// Определение моделей
const Image = require('./models/image');
const Service = require('./models/service');  // Перенесите сюда определение модели Service, если у вас такая есть
const Product = mongoose.model('Product', {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
   quantity: { type: Number, required: true, default: 0 },
});

// Определение Middleware для CORS
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
 
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  next();
});

// Служить статические файлы
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html')); // Обновите путь при необходимости
});

const uploadDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadDirectory));
app.use('/api', router);
app.use('/images', express.static(path.join(__dirname, 'uploads', 'images')));
app.use('/gallery', express.static(path.join(__dirname, 'uploads', 'gallery')));

// Обработка форм
app.use('/api/images', imageRoutes);
app.get("./",(req, res) => {
  res.send("Express App is runing")
})
// Настройки для загрузок файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads', 'images');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `product_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const productUpload = multer({ storage: productStorage });

app.post('/uploads', productUpload.single('product'), (req, res) => {
  if (req.file) {
    res.json({
      success: 1,
      image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  } else {
    res.status(400).send('No file uploaded.');
  }
});

// Директория для сохранения изображений галереи
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads', 'gallery');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `gallery_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const galleryUpload = multer({ storage: galleryStorage });
// Маршрут для загрузки изображений галереи
app.post('/upload-gallery', galleryUpload.single('image'), async (req, res) => {
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
fs.mkdir(uploadDirectory, { recursive: true }, (err) => {
  if (err && err.code !== 'EEXIST') {
    console.error("Не могу создать папку для загрузок: ", err);
    process.exit(1);
  }
});

app.use('/api/gallery', galleryUpload.single('image'), galleryRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/images/user-likes', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const images = await Image.find({ likes: userId }, '_id');
    const likedImageIds = images.map(img => img._id);
    res.json(likedImageIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/images/like/:id', fetchUser, async (req, res) => {
  try {
    const imageId = req.params.id;
    const userId = req.user.id;

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: "Изображение не найдено." });

    if (image.likes.includes(userId)) {
      return res.status(400).json({ message: "Вы уже поставили лайк этому изображению." });
    }

    image.likes.push(userId);
    await image.save();
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/images/like/:id', fetchUser, async (req, res) => {
  try {
    const imageId = req.params.id;
    const userId = req.user.id;

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: "Изображение не найдено." });

    if (!image.likes.includes(userId)) {
      return res.status(400).json({ message: "Вы не ставили лайк этому изображению." });
    }

    image.likes = image.likes.filter(id => id !== userId);
    await image.save();
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CRUD операций для продуктов
app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id = products.length ? products.slice(-1)[0].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    description: req.body.description,
    quantity: req.body.quantity, // Добавьте это
  });

  await product.save();
  console.log("Product saved");
  res.json({ success: true, name: req.body.name });
});

// Схема для сообщений
const messageSchema = new mongoose.Schema({
  userId: String,
  text: String,
  userName: String,
  timestamp: String,
});

const Message = mongoose.model('Message', messageSchema);
//
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product removed");
  res.json({ success: true });
});

app.get('/allproducts', async (req, res) => {
  let products = await Product.find({}, 'id name image category new_price old_price description quantity');
  console.log("All products fetched");
  res.send(products);
});

//
app.get('/allservices', async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

//редактирование товара
app.put('/updateproduct/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        old_price: req.body.old_price,
        new_price: req.body.new_price,
        quantity: req.body.quantity
      },
      { new: true }
    );
    if (updatedProduct) {
      res.json({ success: true, product: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// Модель пользователя
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
  emailToken: String,
  isVerified: Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}));

// Настройка транспорту `nodemailer` для Яндекс.Почты
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'yandex',
    host: 'smtp.yandex.ru',
     port: 465, 
    secure: true,
    auth: {
      user: process.env.YANDEX_USER,
      pass: process.env.YANDEX_PASS,
    },
  })
);


transporter.verify(function (error, success) {
  if (error) {
    console.error("Ошибка при верификации транспорта:", error);
  } else {
    console.log('Настройки транспорта верны. Готов к отправке');
  }
});

// Регистрация с верификацией email
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с такой почтой уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailToken = crypto.randomBytes(64).toString('hex');

    const user = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      emailToken,
      isVerified: false,
    });

    await user.save();

const mailOptions = {
  from: process.env.YANDEX_USER,
  to: email,
  subject: 'Подтверждение email',
  html: `<p>Кликните по ссылке для подтверждения: <a href="${process.env.CLIENT_URL.replace(/\/$/, "")}/verify-email?token=${emailToken}">Подтвердить Email</a></p>`,
};

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Регистрация успешна! Подтвердите email.' });
  } catch (err) {
    console.error('Ошибка при регистрации:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ emailToken: token });

    if (!user) {
      return res.status(400).json({ message: "Неверный токен" });
    }

    // Если пользователь уже подтвержден
    if (user.isVerified) {
      return res.status(400).json({ message: "Email уже подтвержден." });
    }

    user.isVerified = true;
    user.emailToken = null; // Обнуляйте токен, чтобы не использовать повторно
    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Email подтвержден! Теперь вы можете войти.", token: authToken });
  } catch (error) {
    console.error("Ошибка при подтверждении email:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
// Восстановление пароля через email
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const resetToken = crypto.randomBytes(64).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 час
    await user.save();

// Внутри маршрута /forgot-password
const clientUrl = process.env.CLIENT_URL.replace(/\/$/, ""); // Убедитесь, что URL заканчивается на '/'
const resetUrl = `${clientUrl}/reset-password/${resetToken}`;
    const mailOptions = {
      from:process.env.YANDEX_USER,
      to: email,
      subject: 'Сброс пароля',
      html: `<p>Перейдите по ссылке для сброса пароля: <a href="${resetUrl}">Сбросить пароль</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Инструкции по сбросу пароля отправлены на email' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Сброс пароля
app.post('/reset-password/:token', async (req, res) => {
  console.log('Получен запрос на сброс пароля с токеном:', req.params.token);
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Проверяем, что токен не истек
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Токен недействителен или истек' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    // Генерация JWT токена
    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Отправка подтверждающего письма
    const mailOptions = {
      from: process.env.YANDEX_USER, // Убедитесь, что используете правильный email
      to: user.email,
      subject: 'Пароль успешно изменен',
      html: `<p>Здравствуйте, ${user.username}!</p>
             <p>Ваш пароль был успешно изменен.</p>
             <p>Если вы не выполняли это действие, пожалуйста, свяжитесь с нашей поддержкой.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Пароль успешно обновлен', token: authToken });
  } catch (err) {
    console.error('Ошибка при сбросе пароля:', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});


// Маршрут авторизации
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passCompare = await bcrypt.compare(password, user.password);
      if (passCompare) {
        if (!user.isVerified) {
          return res.json({ success: false, errors: "Пожалуйста, подтвердите свой email перед входом." });
        }
        const data = {
          user: {
            id: user.id
          }
        };
        const token = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
        res.json({
          success: true,
          token
        });
      } else {
        res.json({ success: false, errors: "Неверный пароль" });
      }
    } else {
      res.json({ success: false, errors: "Пользователь с таким email не найден" });
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ success: false, errors: "Ошибка на сервере" });
  }
});
// Service CRUD operations
app.get('/services', async (req, res) => {
  try {
    const services = await Service.find({}, '_id serviceName description price category').exec();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/services', async (req, res) => {
  try {
    const { serviceName, description, price, category } = req.body;
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



// Маршруты для новых коллекций и популярных частей
app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  console.log("New Collection fetched");
  res.send(newCollection);
});

app.get('/popularinpart', async (req, res) => {
  let products = await Product.find({ category: "part" });
  let popularInPart = products.slice(0, 4);
  console.log("Popular in Part fetched");
  res.send(popularInPart);
});

// Endpoints для корзины
app.post('/addtocart', fetchUser, async (req, res) => {
  try {
    const productId = req.body.itemId;
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    if (product.quantity <= 0) {
      return res.status(400).json({ message: "Товар закончился" });
    }

    const userData = await Users.findOne({ _id: req.user.id });

    if (userData.cartData[productId] < product.quantity) {
      product.quantity -= 1;
      await product.save();

      userData.cartData[productId] += 1;
      await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
      res.json({ message: "Added" });
    } else {
      res.status(400).json({ message: "Нельзя добавить больше, чем доступно на складе" });
    }
  } catch (error) {
    console.error('Error while adding to cart:', error.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
// Эндпоинт для поиска данных
app.get('/api/search', async (req, res) => {
  const query = req.query.query;
  
  if (!query) {
    return res.status(400).json({ message: 'Необходимо указать параметр запроса' });
  }

  try {
    // Пример поиска по коллекциям из базы данных MongoDB
    const services = await Service.find({ $text: { $search: query } }).exec();
    const products = await Product.find({ $text: { $search: query } }).exec();
    const images = await Image.find({ $text: { $search: query } }).exec();

    // Объединение всех результатов
    const results = [
      ...services.map(service => ({ id: service._id, title: service.serviceName, type: 'Service', description: service.description })),
      ...products.map(product => ({ id: product._id, title: product.name, type: 'Product', description: product.category,  quantity: product.quantity})),
      ...images.map(image => ({ id: image._id, title: image.description, type: 'Image', description: image.filePath }))
    ];
    
    res.json(results);
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

 //creating enpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
  console.log("GetCart request received");
  try {
      console.log(`Fetching cart data for user with ID: ${req.user.id}`);
      let userData = await Users.findOne({_id: req.user.id});
      
      if (!userData) {
          console.log(`User with ID ${req.user.id} not found`);
          return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (!userData.cartData) {
          console.log(`Cart data not found for user with ID: ${req.user.id}`);
          return res.status(404).json({ message: "Данные о корзине не найдены" });
      }

      console.log(`Cart data retrieved successfully for user with ID: ${req.user.id}`);
      res.json(userData.cartData);
  } catch (error) {
      console.error('Ошибка при получении данных корзины:', error.message);
      res.status(500).json({ message: "Ошибка сервера" });
  }
});




// Маршруты для изображений
app.post('/api/images/like/:id', fetchUser, async (req, res) => {
  try {
    const imageId = req.params.id;
    const clientId = req.user.id;

    if (!clientId) return res.status(400).json({ message: "clientId отсутствует в куках." });
    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: "Изображение не найдено." });
    if (image.likes.includes(clientId)) return res.status(409).json({ message: "Вы уже ставили лайк." });

    image.likes.push(clientId);
    await image.save();
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/images/delete/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: 'Изображение не найдено' });
    res.json({ message: 'Изображение успешно удалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CRUD операций для услуг
app.get('/services', async (req, res) => {
  try {
    const services = await Service.find({}, '_id serviceName description price category').exec();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/services', async (req, res) => {
  try {
    const { serviceName, description, price, category } = req.body;
    const newService = new Service({ serviceName, description, price, category });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/services/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService ? updatedService : { message: 'Service not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/services/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    res.json(deletedService ? { message: 'Service deleted' } : { message: 'Service not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/services/:category', async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.category });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.use(requestLogger);
app.use(errorLogger);
// Тестирование обработки ошибок
app.get('/crash-test', (req, res, next) => {
  setTimeout(() => next(new Error('Server will crash now')), 0);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);
app.use('/', indexRouter);

app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Неправильный email или пароль" });
    }

    const isMatch = (password === admin.password); // Лучше использовать bcrypt для сравнения хешированных паролей

    if (!isMatch) {
      return res.status(401).json({ message: "Неправильный email или пароль" });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Ошибка во время авторизации:", error.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.use('/admin-panel', verifyToken, express.static(path.join(__dirname, 'build')));
app.post('/admin/create', async (req, res) => {
  const newAdmin = new Admin({
    email: 'admin@example.com',
    password: 'password123', // не забудьте изменить это на более сложный пароль
  });
  
  await newAdmin.save();
  res.send('Admin created');
});

app.use('/admin-panel', verifyToken, (req, res) => {
  // Ваши административные маршруты
});


app.get('/get-ip', (req, res) => {
  const ip = req.clientIp;
  console.log(`Получен IP: ${ip}`);
  res.json({ ip });
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
