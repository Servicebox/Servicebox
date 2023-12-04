const express = require('express');
const PORT = 5000;
const { URL } = require('./utils/constants');
const cors = require('cors');
const index = require('./routes/index');
const app = express();
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

mongoose
  .connect(URL)
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.use(cors());
app.use(express.json());
app.use('/', index);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();