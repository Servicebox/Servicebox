import React, { useState, useEffect } from 'react';
import "./OtherService.css"
import axios from 'axios';

const OtherServiceList = () => {
  const [otherPrices, setOtherPrices] = useState([]);

  useEffect(() => {
    const getCategoryOtherPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Другие');
        setOtherPrices(response.data);
      } catch (error) {
        console.error('Error fetching other replacement prices: ', error);
      }
    };
    getCategoryOtherPrices();
  }, []);

  return (
    <div className='other'>
      <h1 className='other__title'>Цены на работу по ремноту роботов-пылесосов, электронных книг, Bluetooth-колонок, игровых приставок, видеорегистраторов </h1>
      <span className="smaller-font">Если не нашли, что искали звоните 8911 501 88 28. Цены указаны без учета запчастей</span>
      <table>
        <thead>
          <tr>
            <th>Название услуги</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {otherPrices.map((otherPrice) => (
            <tr key={otherPrice._id}>
              <td>{otherPrice.serviceName}</td>
              <td>{otherPrice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='glass__sabtitle-one'>* - время ремонта может меняться в зависимости от модели устройства и сложности проводимых работ</p>
        <p className='glass__sabtitle'>Информация о ценах, возможных выгодах и условиях приобретения доступна в сервисном центре Servicebox Не является публичной офертой.</p>
    </div>
  );
}

export default OtherServiceList;