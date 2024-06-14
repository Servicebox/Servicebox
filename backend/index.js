const express = require('express');
const app = express();
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config()
console.log(process.env.SECRET); 
const jwt = require('jsonwebtoken');
const PORT = 8000;
const cors = require('cors');
const bcrypt = require('bcrypt');




const allowedCors = [
  'http://localhost:5173',
  'http://localhost:4173/listproduct',
  'http://localhost:4173/admin/',
  'http://localhost:4173',
  'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js',
'https://servicebox35.pp.ru/get-client-id',
'http://localhost:3000/api/images/delete/',
'http://localhost:3000/admin-panel/delete-image',
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
  'https://localhost:000',
  'http://localhost:5000',
  'https://localhost:5000',
  'https://localhost:3000/services',
  'http://localhost:3000/services',
  'http://localhost:3000/products',
  'https://localhost:3000/api/products',
  'http://localhost:3000/api/images',
  'http://localhost:3000/api/images/like',
  'http://localhost:3000/send-request',
  'http://localhost:3000/api/', 
  'http://localhost:3000',
  'http://localhost:5000',
  'https://localhost:3000',
  'http://localhost:3000',
   'https://localhost:8000',
  'http://localhost:8000',
  'https://optfm.ru/api/',
  'http://optfm.ru/api/',
  'http://localhost:3000/uploads',
  'http://localhost:5173',
  'https://servicebox35.pp.ru/addproduct',
  'https://servicebox35.pp.ru/allproduct',
  'https://servicebox35.pp.ru/removeproduct',
  'https://servicebox35.pp.ru/signup',
  'https://servicebox35.pp.ru/signup',
  'https://servicebox35.ru/login',
  'http://192.168.1.38:5173',
  'https://servicebox35.pp.ru/popularinpart',
  'https://servicebox35.pp.ru/allproducts',
  'https://servicebox35.pp.ru/newcollections',
  'https://servicebox35.pp.ru/init-payment',
  'http://localhost:3000/init-paymen',
  ' http://localhost:5000/api/gallery ',
  'https://servicebox35.pp.ru/api/gallery',
  'https://servicebox35.pp.ru/uploads',
  'http://localhost:3000/addtocart',
  'https://servicebox35.pp.ru/api/uploads',
  'http://localhost:8000/api/uploads',
  'http://localhost:3001/listproduct',
  'http://localhost:3001',
  'https://servicebox35.pp.ru/api/uploads',
  'http://localhost:8000/api/uploads',
  'http://localhost:3001/listproduct',
  'http://localhost:3001',
  'https://servicebox35.pp.ru/api/uploads',
  'http://localhost:3001/admin/addproduct',

];


const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedCors.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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
//const fetchUser = require('./middlewares/fetchUser')

const glassReplacementRoutes = require('./routes/glassReplacementRoutes');
const imageRoutes = require('./routes/images');

const galleryRoutes = require('./routes/gallery');
const multer = require('multer');
const { type } = require('os');
const { errors } = require('celebrate');


mongoose.set('strictQuery', true);


// Middleware для CORS
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
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Serve static files
const uploadDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/images', express.static(path.join(__dirname, 'uploads', 'images')));
app.use('/gallery', express.static(path.join(__dirname, 'uploads', 'gallery')));

app.use('/admin/assets', express.static(path.join(__dirname, 'dist/assets')));

app.use('/static', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(cookieParser());
mongoose.connect('mongodb://127.0.0.1:27017/serviceboxdb')
  .then(() => console.log('Соединение с базой данных установлено'))
  .catch((error) => console.error('Ошибка подключения к базе данных:', error));


app.get("./",(req, res) => {
  res.send("Express App is runing")
})


fs.mkdir(uploadDirectory, { recursive: true }, (err) => {
  if (err && err.code !== 'EEXIST') {
    console.error("Не могу создать папку для загрузок: ", err);
    process.exit(1);
  }
});

// Define the Image model

const Service = mongoose.model('Service', {
  serviceName: String,
  description: String,
  price: String,
  category: String,
});
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


// Add new product
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    try {
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});



//Creating api for deleting Products

app.post('/removeproduct',async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });

})
//Creating api for getting all Products

app.get('/allproducts', async (req, res) => {
   let products = await Product.find({});
   console.log("all products fetched");
   res.json(products);
});

//Shema creating for user model

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

//creating enpoint for register
//creating enpoint for register
app.post('/signup', async(req,res)=>{

  let check = await Users.findOne({email:req.body.email});
    if (check){
      return res.status(400).json({success:false,errors:"existing user found with same email adress"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++){
    cart[i]=0;
    }
    const user = new Users({
      name:req.body.username,
      email:req.body.email,
      password:req.body.password,
      cartData:cart,
    })
    await user.save();

    const data = {
      user:{
        id:user.id
      }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({
      success:true,token})
    })

//creating enpoint user login

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
//creating enpoint for new collection data

app.get('/newcollections',async(req,res)=>{
let products = await Product.find({});
let newCollection = products.slice(1).slice(-8);
console.log("newCollection feched");
res.send(newCollection);
})


//creating enpoint for popular parts

app.get('/popularinpart',async(req,res)=>{
  let products = await Product.find({category:"part"});
  let popular_in_part = products.slice(0,4);
  console.log("popular_in_part feched");
  res.send(popular_in_part);
})



//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  console.log('Received token:', token); // Логирование токена
  if (!token) {
    return res.status(401).send({ errors: "пожалуйста, пройдите аутентификацию" });
  }
  try {
    const data = jwt.verify(token, 'secret_ecom');
    console.log('Decoded data:', data); // Логирование результата декодирования
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message); // Логирование ошибки декодирования
    return res.status(401).send({ errors: "пожалуйста, пройдите аутентификацию" });
  }
};

//creating enpoint for adding products in carta
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

    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
    res.json({ message: "Added" });
  } catch (error) {
    console.error('Error while adding to cart:', error.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});


//creating enpoint for removing products from cart
app.post('/removefromcart',fetchUser,async(req,res)=>{
  console.log("removed",req.body.itemId);
  let userData = await Users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId]>0)
  userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
  res.json({ message: "Removed" });
  })


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

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // 'Bearer TOKEN'
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      throw new Error('Нет доступа');
    }
    req.user = decoded; // добавляем информацию о пользователе в объект запроса
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Нет доступа' });
  }
};

app.get('/admin/dashboard', adminAuth, (req, res) => {
  res.send('Добро пожаловать на админскую панель');
});

app.use('/api/images', imageRoutes);

// Multer setup for product images

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


const productstorage= multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads', 'images');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `product_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploads = multer({ storage: productstorage });
  //creating uploadsProduct Endpoint for imagess
  app.use('/images', express.static(path.join(__dirname, 'uploads', 'images')))
  // Multer setup для загрузки изображений продуктов
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
// Маршрут для загрузки изображений продуктов
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

// Multer setup для загрузки изображений галереи
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





{/*const generateClientId = () => `client_${Math.random().toString(36).substring(2, 15)}`;*/}

const getClientId = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; client-id=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

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

app.use('/api', glassReplacementRoutes);

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

// Route for testing error handling
app.get('/crash-test', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Server will crash now'));
  }, 0);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);
app.use('/', indexRouter);

// Start server
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