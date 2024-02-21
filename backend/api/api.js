//api.js

const axios = require('axios');
const FormData = require('form-data');
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

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});