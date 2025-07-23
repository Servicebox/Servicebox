const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.YANDEX_USER || 'rvgneccdabwgaput',
    pass: process.env.YANDEX_PASS || 's89062960353@yandex.ru'
  },
});