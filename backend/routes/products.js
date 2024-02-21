//  products.js
const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const router = express.Router();


router.get('/products', async (req, res) => {
try {
let data = new FormData();
data.append('auth_id', '5948');
data.append('auth_key', 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp');
data.append('method', 'catalog.getElementList');
data.append('limit', 1000);
data.append('page', 1);
data.append('page', 2);
//data.append('page', 3);
data.append('include_subsection', 1);
//data.append('section_id', 0);
//data.append('metod', 'catalog.getImage');

if (req.query.section_id) {
  data.append('section_id', req.query.section_id);  // Добавляем `section_id` в тело запроса
  data.append('section_id', req.query.categoryId); 
}

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


router.get('/sections', async (req, res) => {
  try {
    let data = new FormData();
    data.append('auth_id', '5948');
    data.append('auth_key', 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp');
    data.append('method', 'catalog.getSectionList');
    data.append('include_subsection', 1);
    data.append('include_subsection', 1);
    
   //data.append('section_id', 0);
   
    data.append('page', 1)

    
    // Добавьте другие необходимые параметры запроса, такие как limit, page и т. д.

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