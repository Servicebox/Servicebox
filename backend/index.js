const express = require('express');
const PORT = 5000;
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes/index');
const cors = require('cors');

mongoose.set('strictQuery', true);

mongoose
  .connect('mongodb://localhost:27017/serviceboxdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Соединение с базой данных установлено');
  })
  .catch((error) => {
    console.error('Не удалось подключиться к базе данных', error);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Server will crash now'));
  }, 0);
});

app.use(limiter);
app.use(errorLogger);
app.use('/', indexRouter);

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on('error', (error) => {
    console.error('Server start error:', error);
  });
};

startServer();