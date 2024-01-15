const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes/index');
const { allowedCors, corsOptions } = require('./middlewares/cors');
const router = require('./routes/index');

const glassReplacementRoutes = require('./routes/glassReplacementRoutes');

//const productRouter = require('./routes/products');

mongoose.set('strictQuery', true);

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

    
//const app = express();
app.use(express.json());

app.use(glassReplacementRoutes);
//app.use(productRouter); // Используем роутер для товаров

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

// Роут для тестирования обработки ошибок
app.get('/crash-test', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Server will crash now'));
  }, 0);
});
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