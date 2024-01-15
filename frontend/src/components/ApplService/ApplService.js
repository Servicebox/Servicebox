import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ApplService.css"

const ApplServiceList = () => {
  const [applPrices, setApplPrices] = useState([]);

  useEffect(() => {
    const getCategoryApplPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Аппл');
        setApplPrices(response.data);
      } catch (error) {
        console.error('Error fetching appl replacement prices: ', error);
      }
    };
    getCategoryApplPrices();
  }, []);

  return (
    <div className='appl'>
      <h1 className='appl__title'>Цены на замену аккумулятроа, дисплейного модуля, Iphone, Ipad, Apple Wath </h1>
      <span className="smaller-font">По другим моделям уточняйте по номеру телефона 8911 501 88 28</span>
      <table>
        <thead>
          <tr>
            <th>Название услуги</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {applPrices.map((applPrice) => (
            <tr key={applPrice._id}>
              <td>{applPrice.serviceName}</td>
              <td>{applPrice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='glass__sabtitle-one'>* - время ремонта может меняться в зависимости от модели устройства и сложности проводимых работ</p>
        <p className='glass__sabtitle'>Информация о ценах, возможных выгодах и условиях приобретения доступна в сервисном центре Servicebox Не является публичной офертой.</p>
    </div>
  );
}

export default ApplServiceList;