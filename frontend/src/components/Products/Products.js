import axios from 'axios';
import "./Products.css"

const requestData = {
  auth_id: '5948',
  auth_key: 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp',
  method: 'catalog.getElementList',
  limit: 500,
  page: 1
};

axios.post('https://optfm.ru/api/', requestData)
  .then((response) => {
    // Обработка успешного ответа
    const items = response.data.response.items;
    items.forEach((item) => {
      // обработка полученных данных по конкретному товару
    });
  })
  .catch((error) => {
    console.error('Ошибка выполнения запроса:', error);
  });

const imageRequestData = {
  auth_id: '5948',
  auth_key: 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp',
  method: 'catalog.getImage',
  element_id: 63005
};

axios.post('https://optfm.ru/api/', imageRequestData)
  .then((response) => {
    // Обработка успешного ответа
    if (response.headers['content-type'] === 'application/json; charset=utf-8') {
      console.log(response.data);
    } else {
      // Сохранение файла
      console.log('Файл сохранен с именем', response.headers['content-disposition'].split('=')[1]);
    }
  })
  .catch((error) => {
    console.error('Ошибка выполнения запроса:', error);
  });