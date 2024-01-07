const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config/config.json'); // содержит идентификатор и ключ для работы с API

router.post('/getSectionList', (req, res) => {
  const requestData = {
    auth_id: 5948,
    auth_key: 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp',
    method: 'catalog.getSectionList',
    limit: 500,
    page: 0
  };

  request.post({ url: 'https://optfm.ru/api/', form: requestData }, (error, response, body) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      const data = JSON.parse(body);
      res.status(200).json(data);
    }
  });
});

module.exports = router;