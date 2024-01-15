import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Добавленный импорт, чтобы использовать библиотеку axios
import "./TelephoneService.css";

const TelephoneServiceList = () => {
  const [telephonePrices, setTelephonePrices] = useState([]);

  useEffect(() => {
    const getCategoryTelephonePrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Телефон');
        setTelephonePrices(response.data);
      } catch (error) {
        console.error('Error fetching telephone replacement prices: ', error);
      }
    };
    getCategoryTelephonePrices();
  }, []);

  return (
    <div className='telephone'>
      <h1 className='telephone__title'>Цены на работу по ремноту телефонов любых марок</h1>
      <span className="smaller-font">Если не нашли, что искали звоните 8911 501 88 28. Цены указаны без учета запчастей</span>
      <table>
        <thead>
          <tr>
            <th>Название услуги</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {telephonePrices.map((telephonePrice) => (
            <tr key={telephonePrice._id}>
              <td>{telephonePrice.serviceName}</td>
              <td>{telephonePrice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='glass__sabtitle-one'>* - время ремонта может меняться в зависимости от модели устройства и сложности проводимых работ</p>
        <p className='glass__sabtitle'>Информация о ценах, возможных выгодах и условиях приобретения доступна в сервисном центре Servicebox Не является публичной офертой.</p>
    </div>
  );
};

export default TelephoneServiceList;