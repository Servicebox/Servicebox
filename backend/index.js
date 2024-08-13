const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const compression = require('compression');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const fetchUser = require('./middlewares/fetchUser');
const glassReplacementRoutes = require('./routes/glassReplacementRoutes');
//const service = require('./models/service');
const imageRoutes = require('./routes/images');

const galleryRoutes = require('./routes/gallery');
const indexRouter = require('./routes/index');
const MONGODB_URI = 'mongodb://127.0.0.1:27017/serviceboxdb';
const JWT_SECRET = process.env.JWT_SECRET || 'secret_ecom';
const router = express.Router();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const Admin = require('./models/Admin');
const adminRoutes = require('./routes/admin');
const verifyToken = require('./middlewares/verifyToken');

const PORT = 8000;

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
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());

app.use('/api', glassReplacementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/admin', adminRoutes);
// База данных

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI)
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
app.use(express.static(path.join(__dirname, 'build')));


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

// клиент 


app.get('/get-client-id', (req, res) => {
  let clientId = req.cookies['client-id']; // Получить client-id из куки, если он есть
  if (!clientId) {
    clientId = `client_${Math.random().toString(36).substring(2, 15)}`; // Generate unique id
    res.cookie('client-id', clientId, {
      httpOnly: true,
      maxAge: 86400 * 1000,
      sameSite: 'None',
      secure: true,
    });
  }
  res.json({ clientId });
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
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/api/images/like/:id', fetchUser, async (req, res) => {
  console.log(`Received token: ${req.header('auth-token')}`);
  console.log(`User ID from token: ${req.user.id}`);

  try {
    const imageId = req.params.id;
    const clientId = req.user.id; 

    if (!clientId) {
      return res.status(400).json({ message: "clientId отсутствует в куках." });
    }

    const image = await Image.findById(imageId);
    
    if (!image) {
      return res.status(404).json({ message: "Изображение не найдено." });
    }

    if (Array.isArray(image.likes) && image.likes.includes(clientId)) {
      return res.status(409).json({ message: "Вы уже ставили лайк." });
    }

    image.likes.push(clientId);
    await image.save();

    res.status(200).json(image);
  } catch (error) {
    console.error(`Error liking image: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/gallery/delete/:id', async (req, res) => {
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
    quantity: req.body.quantity,
  });

  await product.save();
  console.log("Product saved");
  res.json({ success: true, name: req.body.name });
});

app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product removed");
  res.json({ success: true });
});

app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

//


// CRUD операций для пользователей
const Users = mongoose.model('Users',{
  name:{
    type:String,
    
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
   
  },
 cartData:{
    type:Object,
   
  }, 
  date:{
    type:Date,
    default:Date.now,
  }
})

app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
  }

  let cart = Array.from({ length: 301 }).reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {});
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  
  await user.save();
  const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET);

  res.json({ success: true, token });
});

app.post('/login',async(req,res)=>{
  let user = await Users.findOne({email:req.body.email});
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({
        success:true,token
      });
    }
    else{
      res.json({success:false,errors:"Wrong password"})
    }
    }
    else{
      res.json({success:false,errors:"Wrong email id"})
    
  }
})


// Service CRUD operations
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
    console.log("added", req.body.itemId);
    let userData = await Users.findOne({_id: req.user.id});
    
    if (!userData) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (!userData.cartData) {
      return res.status(404).json({ message: "Данные о корзине не найдены" });
    }

    // Уменьшаем количество товара на складе
    let product = await Product.findOne({id: req.body.itemId});
    if (product.quantity > 0) {
      product.quantity -= 1;
      await product.save();
      
      userData.cartData[req.body.itemId] += 1;
      await Users.findOneAndUpdate({_id: req.user.id},{cartData:userData.cartData});
      res.json({ message: "Added" });
    } else {
      res.status(400).json({ message: "Товар закончился" });
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

startServer();