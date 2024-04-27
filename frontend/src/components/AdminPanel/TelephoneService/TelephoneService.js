import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Добавленный импорт, чтобы использовать библиотеку axios
import "./TelephoneService.css";
import Search from "../../Search/Search"
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";

const TelephoneServiceList = () => {
  const [telephonePrices, setTelephonePrices] = useState([]);


  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };



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


  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };

  const filteredTelephonePrices = telephonePrices.filter((telephonePrice) => {
    return telephonePrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });



  return (
    <div className='telephone'>
      <h1 className='telephone__title'>Цены на работу по ремноту телефонов любых марок</h1>
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
        {filteredTelephonePrices.slice(0, showAll ? filteredTelephonePrices.length : 15).map((telephonePrice) => (
            <tr key={telephonePrice._id}>
              <td>{telephonePrice.serviceName}</td>
              <td>{telephonePrice.price}</td>
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
};

export default TelephoneServiceList;