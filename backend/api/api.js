const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config/config.json'); // содержит идентификатор и ключ для работы с API

// Обработчик получения списка разделов каталога товаров
router.get('/sections', (req, res) => {
  const requestData = {
    auth_id: config.auth_id,
    auth_key: config.auth_key,
    method: 'catalog.getSectionList',
    limit: 500,
    page: 0,
  };

  request.post('https://optfm.ru/api/', { form: requestData }, (error, response, body) => {
    // Обработка ответа от API
    if (!error && response.statusCode === 200) {
      res.status(200).json(JSON.parse(body));
    } else {
      res.status(500).json({ error: 'Failed to fetch section list' });
    }
  });
});

module.exports = router;