// Установите зависимости
const express = require('express');
const mongoose = require('mongoose');

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Определение схемы данных
const dataSchema = new mongoose.Schema({
  name: String,
  phone: String,
  description: String
});

// Создание модели
const Data = mongoose.model('Data', dataSchema);

// Создание сервера express
const app = express();

// Разрешить парсинг данных из формы
app.use(express.urlencoded({ extended: true }));

// Обработка данных из формы
app.post('/submit', (req, res) => {
  // Получить данные из формы
  const { name, phone, description } = req.body;

  // Создать новый экземпляр модели с данными из формы
  const newData = new Data({
    name,
    phone,
    description
  });

  // Сохранить данные в базе данных
  newData.save()
    .then(() => {
      console.log('Data saved successfully');
      res.redirect('/success'); // Редирект на страницу "Успех"
    })
    .catch((error) => {
      console.error('Error saving data:', error);
      res.redirect('/error'); // Редирект на страницу ошибки
    });
});

// Слушаем сервер на указанном порту
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});