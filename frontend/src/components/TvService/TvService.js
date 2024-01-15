import React, { useState, useEffect } from 'react';
import "./TvService.css"
import axios from 'axios';

const TvServiceList = () => {
  const [tvPrices, setTvPrices] = useState([]);

  useEffect(() => {
    const getCategoryTvPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Телевизор');
        setTvPrices(response.data);
      } catch (error) {
        console.error('Error fetching tv replacement prices: ', error);
      }
    };
    getCategoryTvPrices();
  }, []);

  return (
    <div className='tv'>
      <h1 className='tv__title'>Цены на работу по ремноту телевизоров и мониторов </h1>
      <span className="smaller-font">Если не нашли, что искали звоните 8911 501 88 28. Цены указаны без учета запчастей</span>
      <table>
        <thead>
          <tr>
            <th>Название услуги</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {tvPrices.map((tvPrice) => (
            <tr key={tvPrice._id}>
              <td>{tvPrice.serviceName}</td>
              <td>{tvPrice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='glass__sabtitle-one'>* - время ремонта может меняться в зависимости от модели устройства и сложности проводимых работ</p>
        <p className='glass__sabtitle'>Информация о ценах, возможных выгодах и условиях приобретения доступна в сервисном центре Servicebox Не является публичной офертой.</p>
    </div>
  );
}

export default TvServiceList;