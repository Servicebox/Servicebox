// api.js

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Обработчик POST-запроса
router.get('/', async (req, res) => {
  const auth_id = 5948; // Идентификатор
  const auth_key = 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp'; // Ключ

  const requestData = {
    method: 'catalog.getSectionList',
    auth_id,
    auth_key,
    limit: 500,
    page: 0
  };

  try {
    const response = await fetch('https://optfm.ru/api/', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    // Возвращаем результат в формате JSON
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;