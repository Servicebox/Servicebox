const express = require('express');
const PORT = 5000;
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes/index');
const cors = require('cors');
const { allowedCors, corsOptions } = require('./middlewares/cors');

mongoose.set('strictQuery', true);

mongoose
  .connect('mongodb://127.0.0.1:27017/serviceboxdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Соединение с базой данных установлено');
  })
  .catch((error) => {
    console.error('Не удалось подключиться к базе данных', error);
  });

const app = express();

// Middleware для обработки POST запросов и перенаправления их на 'https://optfm.ru/api/'
app.post('/proxy-optfm', async (req, res) => {
  try {
    const response = await axios.post('https://optfm.ru/api/', req.body);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

// Роут для тестирования обработки ошибок
app.get('/crash-test', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Server will crash now'));
  }, 0);
});

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
  });
};

// Запуск сервера
startServer();