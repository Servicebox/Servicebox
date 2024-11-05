// routes/index.js

const express = require('express');
const router = express.Router();

const ctrlTelegram = require('../api/telegramMsg');

// Эндпоинт для отправки формы
router.post('/telegram', ctrlTelegram.sendMsg);

// Эндпоинт для отправки сообщений из чата
router.post('/sendChatMessage', ctrlTelegram.sendChatMessage);

// Эндпоинт для получения обновлений чата
router.get('/webhook', ctrlTelegram.webhook);

module.exports = router;