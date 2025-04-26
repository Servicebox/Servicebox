import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ApplService.css"
import Search from "../Search/Search"
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";

const ApplServiceList = () => {
  const [applPrices, setApplPrices] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

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


  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };

  const filteredApplPrices = applPrices.filter((applPrice) => {
    return applPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });


  return (
    <div className='appl'>
      <h1 className='appl__title'>Цены на замену аккумулятроа, дисплейного модуля, Iphone, Ipad, Apple Wath </h1>
      <span className="smaller-font">По другим моделям уточняйте по номеру телефона 8911 501 88 28</span>
      <Search value={searchQuery} onChange={handleSearch} placeholder="Поиск по названию" />
      <table>
        <thead>
          <tr>
            <th>Название услуги</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplPrices.slice(0, showAll ? filteredApplPrices.length : 15).map((applPrice) => (
            <tr key={applPrice._id}>
              <td>{applPrice.serviceName}</td>
              <td>{applPrice.price}</td>
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

export default ApplServiceList;