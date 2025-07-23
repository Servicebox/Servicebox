const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/service');
const axios = require('axios');
const BOT_TOKEN = process.env.BOT_TOKEN || '7903855692:AAEsBiERZ5B7apWoaQJvX0nNRB-PEJjmBcc';
const CHAT_ID = process.env.CHAT_ID || '406806305';

// Создание записи
router.post('/', async (req, res) => {
  try {
    const { serviceId, serviceName, userName, userPhone, userEmail, deviceModel, notes } = req.body;
    
    // Проверка существования услуги
    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
      return res.status(404).json({ message: 'Услуга не найдена' });
    }

    const booking = new Booking({
      serviceId,
      serviceName,
      userName,
      userPhone,
      userEmail,
      deviceModel,
      notes,
      status: 'pending'
    });

    await booking.save();

    // Отправка уведомления в Telegram
    const telegramMsg = `📝 Новая запись!\n\n` +
      `🔧 Услуга: ${booking.serviceName}\n` +
      `👤 Клиент: ${booking.userName}\n` +
      `📱 Телефон: ${booking.userPhone}\n` +
      `📧 Email: ${booking.userEmail || 'не указан'}\n` +
      `📱 Устройство: ${booking.deviceModel || 'не указано'}\n` +
      `📝 Заметки: ${booking.notes}\n` +
      `🆔 Трек-код: ${booking.trackingCode}`;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: telegramMsg,
      parse_mode: 'Markdown'
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Получение записи по трек-коду
router.get('/track/:code', async (req, res) => {
  try {
    const booking = await Booking.findOne({ trackingCode: req.params.code });
    if (!booking) {
      return res.status(404).json({ message: 'Запись не найдена' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Обновление статуса записи
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Запись не найдена' });
    }
    
    // Добавляем запись в историю статусов
    booking.statusHistory.push({
      status,
      changedAt: new Date()
    });
    
    booking.status = status;
    await booking.save();
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Получение всех записей
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;