//routers/services.js

const express = require('express');
const router = express.Router();
const Service = require('../models/service');
router.use(express.json());

// Создание новой услуги
router.post('/services', async (req, res) => {
  try {
    const { serviceName, description, price, category } = req.body;
    const service = new Service({ serviceName, description, price, category });
    await service.save();
    res.status(201).json({ message: 'Услуга успешно создана', service });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Получение по категории
router.get('/services/:category', async (req, res) => {
    try {
      const category = req.params.category;
      const services = await Service.find({ category: category });
      res.json(services);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Получение всех услуг
router.get('/services', async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Обновление информации об услуге
router.put('/services/:serviceId', async (req, res) => {
    const { serviceName, description, price, category } = req.body;
    const { serviceId } = req.params;
    try {
      const updatedService = await Service.findOneAndUpdate(
        { serviceId: serviceId },
        { serviceName, description, price, category },
        { new: true }
      );
      res.status(200).json({ message: 'Информация об услуге успешно обновлена', service: updatedService });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Удаление услуги
router.delete('/services/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (deletedService) {
      res.status(200).json({ message: 'Услуга успешно удалена' });
    } else {
      res.status(404).json({ message: 'Услуга не найдена' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;