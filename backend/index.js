require('dotenv').config();
const express = require('express');
const { Server } = require('socket.io');
//require('dotenv').config({ path: require('.env') })
//console.log(require("dotenv").config())
const http = require('http');
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
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const newsRoutes = require('./routes/newsRoutes');
const News = require('./models/News');
const promotionRoutes = require('./routes/promotionRoutes');
const app = express();
const User = require('./models/Users');
const YANDEX_USER = process.env.YANDEX_USER;
const YANDEX_PASS = process.env.YANDEX_PASS;
const CLIENT_URL = process.env.CLIENT_URL;
app.set('trust proxy', true);
app.use(requestIp.mw());
const PORT = 8000;
const nodemailer = require('nodemailer');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const apicache = require('apicache');
const cache = apicache.middleware;

// Создание API роутер

const apiRouter = express.Router();

// Создаем объект для хранения соответствий сеансов с пользователями Telegram
const server = http.createServer(app); // Используйте server вместо http для создания экземпляра socket.io

// Инициализация Socket.io сразу после создания сервера
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'https://servicebox35.ru',
    methods: ['GET', 'POST']
  }
});
io.on('connection', (socket) => {
  //console.log('User connected:', socket.id);

  socket.on('joinChat', ({ userId, adminId }) => {
    const room = [userId, adminId].sort().join('_');
    socket.join(room);
    //console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('sendMessage', async (message) => {
    try {
      const newMessage = await Message.create(message);
      const room = [message.senderId, message.receiverId].sort().join('_');
      io.to(room).emit('newMessage', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('markAsRead', async ({ messages, readerId }) => {
    try {
      const ids = messages.map(m => m._id);
      await Message.updateMany(
        { _id: { $in: ids } },
        { $set: { status: 'read' } }
      );

      const updatedMessages = await Message.find({ _id: { $in: ids } });
      const room = [messages[0].senderId, readerId].sort().join('_');
      io.to(room).emit('messagesRead', updatedMessages);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

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
  'https://servicebox35.ru/send-request',
  'https://servicebox35.pp.ru/api/',
  'https://servicebox35.pp.ru',
  'http://localhost:5000',
  'https://localhost:3000',
  'https://servicebox35.ru',
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
  'https://servicebox35.ru/init-paymen',
  'https://servicebox35.pp.ru/api/search',
  'https://localhost:8000/products',
  'https://servicebox35.pp.ru/send',
  'https://servicebox35.pp.ru/signup',
  'http://smtp.yandex.ru',
  'https://smtp.yandex.ru',
  'https://servicebox35.pp.ru/verify-email',
  'https://servicebox35.ru/verify-email',
  'https://servicebox35.pp.ru/signup',
  'https://servicebox35.pp.ru/api/gallery/group',
  'https://servicebox35.ru/api/gallery/group',
  'https://servicebox35.pp.ru/api/auth/login',


];

const isBehindProxy = false; // Change to true if behind a proxy

app.set('trust proxy', isBehindProxy);

// Настройка Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: 'Слишком много запросов. Попробуйте позже.',
});

// Индивидуальный лимит для API продуктов
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 50,
  message: 'Слишком много запросов к API. Подождите минуту.',
});

app.use(apiLimiter);
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedCors.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.urlencoded({ extended: true }));



// Папка для загрузок
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

app.use('/uploads', express.static(uploadDirectory, {
  maxAge: '3d',
  etag: false,
}));

app.use('/api/news', newsRoutes);
app.use('/api', glassReplacementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/admin', adminRoutes);
app.use('/api/user', require('./routes/user.js'));
app.use('/api', userRoutes);
app.use('/api/order', orderRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// База данных

app.use('/api', apiRouter);
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Соединение с базой данных установлено'))
  .catch((error) => console.error('Ошибка подключения к базе данных:', error));


// Определение моделей
const Image = require('./models/image');
const Service = require('./models/service');
const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
});
const Product = mongoose.model('Product', ProductSchema);

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
app.use(express.static(path.join(__dirname, 'build')));


app.use('/uploads', express.static(uploadDirectory));
app.use('/api', router);
app.use('/images', express.static(path.join(__dirname, 'uploads', 'images')));
app.use('/gallery', express.static(path.join(__dirname, 'uploads', 'gallery')));
app.use('/promotions', express.static(path.join(__dirname, 'uploads', 'promotions')));


app.use('/api/auth', authRoutes);


// Обработка форм
app.use('/api/images', imageRoutes);
app.get("./", (req, res) => {
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

///actions
app.use('/api/promotions', promotionRoutes)

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


app.post('/api/uploads', productUpload.array('product', 3), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: 0, message: 'Файлы не загружены' });
  }
  const imageUrls = req.files.map(file => `/images/${file.filename}`);
  res.json({ success: 1, image_urls: imageUrls });
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '3d', // Кэширование на 1 день
  etag: false,
}));

app.get('/api/images/user-likes', fetchUser, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const userId = req.user.id;
    const images = await Image.find({ likes: userId }, '_id');
    const likedImageIds = images.map(img => img._id);
    res.json(likedImageIds);
  } catch (error) {
    console.error('Error fetching user likes:', error.message);
    res.status(500).json({ message: 'Ошибка сервера' });
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
{/*app.post('/api/addproduct', async (req, res) => {
  try {
    const lastProduct = await Product.findOne().sort({ id: -1 }).limit(1);
    const id = lastProduct ? lastProduct.id + 1 : 1;
    const productData = {
      id,
      name: req.body.name,
      images: req.body.images,
      category: req.body.category,
      new_price: Number(req.body.new_price),
      old_price: Number(req.body.old_price),
      description: req.body.description,
      quantity: Number(req.body.quantity)
    };
    const product = new Product(productData);

    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});
*/}

// Схема для сообщений
const messageSchema = new mongoose.Schema({
  userId: String,
  text: String,
  userName: String,
  timestamp: String,
});

const Message = mongoose.model('Message', messageSchema);
//
app.post('/api/removefromcart', fetchUser, async (req, res) => {
  try {
    const productId = req.body.itemId;
    if (!productId) return res.status(400).json({ message: "Некорректный ID товара" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });

    const product = await Product.findOne({ id: Number(productId) });
    if (!product) return res.status(404).json({ message: "Товар не найден" });

    const cartKey = String(productId);
    const currentQuantity = user.cartData.get(cartKey) || 0;

    if (currentQuantity < 1)
      return res.status(400).json({ message: "В корзине такого количества нет" });

    // Уменьшаем количество в корзине:
    user.cartData.set(cartKey, currentQuantity - 1);
    // Увеличиваем на складе:
    product.quantity += 1;

    await user.save();
    await product.save();
    res.json({ message: 'Товар удалён из корзины', cart: Object.fromEntries(user.cartData) });
  } catch (error) {
    console.error('Error while removing from cart:', error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});


// Получить все категории и подкатегории
app.get('/api/categories-with-subcategories', async (req, res) => {
  try {
    const products = await Product.find({}, 'category subcategory').lean();

    // Собираем уникальные категории и для каждой — подкатегории
    const result = {};
    for (const p of products) {
      if (!p.category) continue;
      if (!result[p.category]) result[p.category] = new Set();
      if (p.subcategory) result[p.category].add(p.subcategory);
    }

    // Преобразуем Set в массив
    const categories = Object.entries(result).map(([category, subSet]) => ({
      category,
      subcategories: Array.from(subSet).filter(Boolean) // без пустых
    }));

    res.json(categories);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.get('/api/products', cache('5 minutes'), async (req, res) => {
  const { category, subcategory } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  try {
    const products = await Product.find(filter).lean();
    res.json(products);
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/api/addproduct', async (req, res) => {
  try {
    const lastProduct = await Product.findOne().sort({ id: -1 }).limit(1);
    const id = lastProduct ? lastProduct.id + 1 : 1;
    const productData = {
      id,
      name: req.body.name,
      images: req.body.images,
      category: req.body.category,
      subcategory: req.body.subcategory,           // НОВОЕ!
      new_price: Number(req.body.new_price),
      old_price: Number(req.body.old_price),
      description: req.body.description,
      quantity: Number(req.body.quantity)
    };
    const product = new Product(productData);

    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});
app.get('/api/allproducts', cache('5 minutes'), async (req, res) => {
  try {
    const products = await Product.find({}).lean();

    // Всегда делай images массивом, даже если внутри нет ничего
    const productsWithFullUrls = products.map(product => ({
      ...product,
      images: Array.isArray(product.images) ? product.images.map(img =>
        typeof img === 'string' && img.startsWith('http') ? img : `${req.protocol}://${req.get('host')}${img}`
      ) : [], // если images нет, то вернем []
    }));

    res.json(productsWithFullUrls);
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ success: false, message: 'Ошибка получения товаров' })
  }
});


app.get('/allservices', async (req, res) => {
  let products = await Product.find({});
  //console.log("All products fetched");
  res.send(products);
});

//редактирование товара
app.put('/api/updateproduct/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        old_price: req.body.old_price,
        new_price: req.body.new_price,
        description: req.body.description,
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
// Определение модели пользователя



// Настройка транспорта nodemailer для Яндекс.Почты
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.YANDEX_USER,
    pass: process.env.YANDEX_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    //console.error("Ошибка при верификации транспорта:", error);
  } else {
    //console.log('Настройки транспорта верны. Готов к отправке');
  }
});

// Rate Limiting
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // Ограничение до 10 запросов с одного IP за windowMs
  message: "Слишком много попыток регистрации с этого IP, попробуйте позже."
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Слишком много попыток входа с этого IP, попробуйте позже."
});

// Маршрут регистрации с верификацией email
app.post('/api/signup',
  signupLimiter,
  [
    body('username').notEmpty().withMessage('Имя обязательно'),
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
    body('phone').notEmpty().withMessage('Телефон обязателен'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }

    try {
      const { username, email, password, phone } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.warn(`Попытка регистрации с существующим email: ${email}`);
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
        html: `<p>Кликните по ссылке для подтверждения: <a href="${CLIENT_URL}/verify-email?token=${emailToken}">Подтвердить Email</a></p>`,
      };

      await transporter.sendMail(mailOptions);

      //console.log(`Новый пользователь зарегистрирован: ${email}`);
      res.status(200).json({ message: 'Регистрация успешна! Подтвердите email.' });
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

// Маршрут подтверждения email
app.get('/api/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    //console.log(`Получен запрос на верификацию email с токеном: ${token}`);
    if (!token) {
      console.warn('Токен не предоставлен.');
      return res.status(400).json({ message: "Токен не предоставлен." });
    }

    const user = await User.findOne({ emailToken: token });

    if (!user) {
      console.warn(`Пользователь с токеном ${token} не найден.`);
      return res.status(400).json({ message: "Неверный токен" });
    }

    if (user.isVerified) {
      console.warn(`Пользователь с email ${user.email} уже подтвержден.`);
      return res.status(400).json({ message: "Email уже подтвержден." });
    }

    user.isVerified = true;
    user.emailToken = null; // Обнуляем токен
    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });

    console.log(`Пользователь ${user.email} успешно верифицирован.`);
    res.json({ message: "Email подтвержден! Теперь вы можете войти.", token: authToken });
  } catch (error) {
    console.error("Ошибка при подтверждении email:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.post('/api/login', async (req, res) => {
  // Validate and find user
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const passCompare = await bcrypt.compare(password, user.password);
    if (passCompare) {
      // Generate tokens
      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

      // Store refresh token in the database
      user.refreshToken = refreshToken;
      await user.save();

      res.json({ success: true, accessToken, refreshToken });
    } else {
      res.status(401).json({ success: false, message: 'Неверный пароль' });
    }
  } else {
    res.status(404).json({ success: false, message: 'Пользователь не найден' });
  }
});

// Маршрут запроса сброса пароля
app.post('/api/forgot-password',
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 5, // Ограничение до 5 запросов с одного IP за windowMs
    message: "Слишком много запросов с этого IP, попробуйте позже."
  }),
  [
    body('email').isEmail().withMessage('Некорректный email'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }

    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        console.warn(`Запрос на сброс пароля для несуществующего email: ${email}`);
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const resetToken = crypto.randomBytes(64).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 час
      await user.save();

      // Формирование URL для сброса пароля
      const clientUrl = CLIENT_URL.replace(/\/$/, ""); // Убедитесь, что URL не заканчивается на '/'
      const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

      const mailOptions = {
        from: process.env.YANDEX_USER,
        to: email,
        subject: 'Сброс пароля',
        html: `<p>Перейдите по ссылке для сброса пароля: <a href="${resetUrl}">Сбросить пароль</a></p>`,
      };

      await transporter.sendMail(mailOptions);

      console.log(`Запрос на сброс пароля отправлен на: ${email}`);
      res.json({ message: 'Инструкции по сбросу пароля отправлены на email' });
    } catch (err) {
      console.error('Ошибка в маршруте /forgot-password:', err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

// Маршрут сброса пароля
app.post('/api/reset-password/:token', [
  body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
], async (req, res) => {
  const { token } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array().map(err => err.msg).join(', ') });
  }

  console.log(`Получен запрос на сброс пароля с токеном: ${token}`);

  try {
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Проверяем, что токен не истек
    });

    if (!user) {
      console.warn(`Недействительный или истекший токен сброса пароля: ${token}`);
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
    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });

    // Отправка подтверждающего письма
    const mailOptions = {
      from: process.env.YANDEX_USER,
      to: user.email,
      subject: 'Пароль успешно изменен',
      html: `<p>Здравствуйте, ${user.username}!</p>
             <p>Ваш пароль был успешно изменен.</p>
             <p>Если вы не выполняли это действие, пожалуйста, свяжитесь с нашей поддержкой.</p>`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Пароль успешно изменен для пользователя: ${user.email}`);
    res.json({ success: true, message: 'Пароль успешно обновлен', token: authToken });
  } catch (err) {
    console.error('Ошибка при сбросе пароля:', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});
app.post('/api/refresh-token', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const user = await User.findOne({ refreshToken: token });
    if (!user) {
      return res.sendStatus(403); // Forbidden
    }

    // Проверка валидности refreshToken
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.id !== user.id) {
      return res.sendStatus(403);
    }

    // Генерация нового accessToken
    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
});
// Тестовый маршрут для проверки работы сервера
//app.get("/", (req, res) => {
//res.send("Express App is running");
// });

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
app.get('/api/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  console.log("New Collection fetched");
  res.send(newCollection);
});

app.get('/api/popularinpart', async (req, res) => {
  let products = await Product.find({ category: "для СЦ" });
  let popularInPart = products.slice(0, 4);
  console.log("Popular in Part fetched");
  res.send(popularInPart);
});

// Endpoints для корзины
// routes/products.js
router.post('/api/addtocart', fetchUser, async (req, res) => {
  try {
    const productId = req.body.itemId;
    const userId = req.user.id;

    // Атомарно уменьшаем количество и добавляем в корзину
    const product = await Product.findOneAndUpdate(
      {
        id: productId,
        quantity: { $gt: 0 }
      },
      { $inc: { quantity: -1 } },
      { new: true }
    );

    if (!product) {
      return res.status(400).json({ message: "Товар недоступен" });
    }

    await User.updateOne(
      { _id: userId },
      { $inc: { [`cartData.${productId}`]: 1 } }
    );

    res.json({ message: "Added", newQuantity: product.quantity });
  } catch (error) {
    console.error('Error:', error);
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
      ...products.map(product => ({ id: product._id, title: product.name, type: 'Product', description: product.category, quantity: product.quantity })),
      ...images.map(image => ({ id: image._id, title: image.description, type: 'Image', description: image.filePath }))
    ];

    res.json(results);
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});
///


app.post('/api/removeproduct', async (req, res) => {
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
//creating enpoint to get cartdata
app.post('/api/getcart', fetchUser, async (req, res) => {
  console.log("GetCart request received");
  try {
    console.log(`Fetching cart data for user with ID: ${req.user.id}`);
    let userData = await User.findOne({ _id: req.user.id });

    if (!userData) {
      console.log(`User with ID ${req.user.id} not found`);
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (!userData.cartData || userData.cartData.size === 0) {
      console.log(`Cart data not found or empty for user with ID: ${req.user.id}`);
      return res.status(404).json({ message: "Данные о корзине не найдены" });
    }

    console.log(`Cart data retrieved successfully for user with ID: ${req.user.id}`);
    res.json(Object.fromEntries(userData.cartData));
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

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);
app.use('/', indexRouter);

app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Неправильный email или пароль" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

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
// В разделе с роутами добавьте:
app.post('/api/send-message', async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Сохраняем сообщение в MongoDB
    const newMessage = new Message({
      userId,
      text: message,
      timestamp: new Date()
    });

    await newMessage.save();

    // Отправляем сообщение через Socket.io
    const room = [userId, 'admin'].sort().join('_');
    io.to(room).emit('newMessage', newMessage);

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Dolyami Payment Integration
app.post('/api/init-payment', async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    // Здесь должна быть логика интеграции с API "Долями"
    // Пример запроса к API "Долями"
    const response = await fetch('https://api.dolyami.ru/payment/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        amount,
        clientId: process.env.DOLYAMI_CLIENT_ID,
        secret: process.env.DOLYAMI_SECRET
      })
    });
    const data = await response.json();
    res.json({ success: true, paymentUrl: data.paymentUrl });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ success: false, message: 'Ошибка инициализации платежа' });
  }
});

app.get('/get-ip', (req, res) => {
  const ip = req.clientIp;
  console.log(`Получен IP: ${ip}`);
  res.json({ ip });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
