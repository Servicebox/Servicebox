//routes/products.js

const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const router = express.Router();

router.post('/products', async (req, res) => {
  try {
    let data = new FormData();
    data.append('auth_id', '5948');
    data.append('auth_key', 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp');
    data.append('method', 'catalog.getSectionList');
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://optfm.ru/api/',
      headers: { 
        'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp': '', 
        'Cookie': 'PHPSESSID=vWNuNINIZj3FpFPwaPjqs1ziA8f9fjwV', 
        ...data.getHeaders()
      },
      data : data
    };
    
    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;