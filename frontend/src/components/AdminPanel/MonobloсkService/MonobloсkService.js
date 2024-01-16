import React, { useState, useEffect } from 'react';
import "./MonoblockService.css"
import axios from 'axios';

const MonoblockServiceList = () => {
  const [monoblockPrices, setMonoblockPrices] = useState([]);

  useEffect(() => {
    const getCategoryMonoblockPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Моноблок');
        setMonoblockPrices(response.data);
      } catch (error) {
        console.error('Error fetching Notebook replacement prices: ', error);
      }
    };
    getCategoryMonoblockPrices();
  }, []);

  return (
    <div className='monoblock'>
      <h1 className='monoblock__title'>Цены на работу по ремноту ноутбуков </h1>
      <span className="smaller-font">Если не нашли, что искали звоните 8911 501 88 28. Цены указаны без учета запчастей</span>
      <table>
        <thead>
          <tr>
            <th>Название услуги</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {monoblockPrices.map((monoblockPrice) => (
            <tr key={monoblockPrice._id}>
              <td>{monoblockPrice.serviceName}</td>
              <td>{monoblockPrice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='glass__sabtitle-one'>* - время ремонта может меняться в зависимости от модели устройства и сложности проводимых работ</p>
        <p className='glass__sabtitle'>Информация о ценах, возможных выгодах и условиях приобретения доступна в сервисном центре Servicebox Не является публичной офертой.</p>
    </div>
  );
}

export default MonoblockServiceList;