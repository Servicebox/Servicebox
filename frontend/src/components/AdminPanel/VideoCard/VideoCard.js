import React, { useState, useEffect } from 'react';
import "./VideoCard.css"
import axios from 'axios';
import Search from "../../Search/Search"
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";

const VideocardList = () => {
  const [videocardPrices, setVideocardPrices] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


  useEffect(() => {
    const getCategoryVideocardPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Видеокарты');
        setVideocardPrices(response.data);
      } catch (error) {
        console.error('Error fetching Notebook replacement prices: ', error);
      }
    };
    getCategoryVideocardPrices();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };


  const filteredVideocardPrices = videocardPrices.filter((videocardPrice) => {
    return videocardPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });


  return (
    <div className='videocard'>
      <h1 className='monoblock__title'>Цены на работу по ремонту и обслуживанию видеокарт </h1>
      <p>В обслуживание входит продувка радиатора с вентиляторами, замена термопасты и термопрокладок.</p>
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
        {filteredVideocardPrices.slice(0, showAll ? filteredVideocardPrices.length : 15).map((videocardPrice) => (
            <tr key={videocardPrice._id}>
              <td>{videocardPrice.serviceName}</td>
              <td>{videocardPrice.price}</td>
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

export default VideocardList;