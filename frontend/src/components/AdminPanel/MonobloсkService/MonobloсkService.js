import React, { useState, useEffect } from 'react';
import "./MonoblockService.css"
import axios from 'axios';
import Search from "../../Search/Search"
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";

const MonoblockServiceList = () => {
  const [monoblockPrices, setMonoblockPrices] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


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

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };


  const filteredMonoblockPrices = monoblockPrices.filter((monoblockPrice) => {
    return monoblockPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });


  return (
    <div className='monoblock'>
      <h1 className='monoblock__title'>Цены на работу по ремноту ноутбуков </h1>
      <p>Диагностика бесплатная! Наш мастер произведет диагностику, сообщит о проблеме и предложит решение. Мы договоримся о цене и сроках, мастер начнет работу.</p>
      <span className="smaller-font">Если не нашли, что искали звоните 8911 501 88 28(ул.Северная д.7А, офис 204), 8911 501 06 96(ул.Ленина д.6). Цены указаны без учета запчастей</span> 
       <Search value={searchQuery} onChange={handleSearch} placeholder="Поиск по названию" />

      <table>
        <thead>
          <tr>
            <th>Название услуги</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
        {filteredMonoblockPrices.slice(0, showAll ? filteredMonoblockPrices.length : 15).map((monoblockPrice) => (
            <tr key={monoblockPrice._id}>
              <td>{monoblockPrice.serviceName}</td>
              <td>{monoblockPrice.price}</td>
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

export default MonoblockServiceList;