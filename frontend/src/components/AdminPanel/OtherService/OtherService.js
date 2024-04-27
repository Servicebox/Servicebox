import React, { useState, useEffect } from 'react';
import "./OtherService.css"
import axios from 'axios';
import Search from "../../Search/Search"
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";

const OtherServiceList = () => {
  const [otherPrices, setOtherPrices] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

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

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };

  const filteredOtherPrices = otherPrices.filter((otherPrice) => {
    return otherPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });


  return (
    <div className='other'>
      <h1 className='other__title'>Цены на работу по ремноту роботов-пылесосов, электронных книг, Bluetooth-колонок, игровых приставок, видеорегистраторов </h1>
      <span className="smaller-font">Если не нашли, что искали звоните 8911 501 88 28. Цены указаны без учета запчастей</span>
      <Search value={searchQuery} onChange={handleSearch} placeholder="Поиск по названию" />
      <table>
        <thead>
          <tr>
            <th>Название услуги</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
        {filteredOtherPrices.slice(0, showAll ? filteredOtherPrices.length : 15).map((otherPrice) => (
            <tr key={otherPrice._id}>
              <td>{otherPrice.serviceName}</td>
              <td>{otherPrice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!showAll ? (
        <button className='glass__btn-active' onClick={handleShowAll}>Посмотреть прайс</button>
      ) : (
        <button className='glass__btn' onClick={handleHideAll}>Скрыть прайс</button>
      )}
      <p className='glass__sabtitle-one'>* - время ремонта может меняться в зависимости от модели устройства и сложности проводимых работ</p>
        <p className='glass__sabtitle'>Информация о ценах, возможных выгодах и условиях приобретения доступна в сервисном центре Servicebox Не является публичной офертой.</p>
        <div className="back__btn"> 
      <ul>
      <li><Link to="/">На главную</Link>
      </li>
      </ul>
      </div>
    </div>
  );
}

export default OtherServiceList;