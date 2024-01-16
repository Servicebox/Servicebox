import React, { useState, useEffect } from 'react';
import "./TabletService.css"
import axios from 'axios';
import Search from "../../Search/Search"

const TabletServiceList = () => {
  const [tabletPrices, setTabletPrices] = useState([]);


  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


  useEffect(() => {
    const getCategoryTabletPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Планшет');
        setTabletPrices(response.data);
      } catch (error) {
        console.error('Error fetching tablet replacement prices: ', error);
      }
    };
    getCategoryTabletPrices();
  }, []);



  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };

  const filteredTabletPrices = tabletPrices.filter((tabletPrice) => {
    return tabletPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });



  return (
    <div className='tablet'>
      <h1 className='tablet__title'>Цены на работу по ремноту планшетов </h1>
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
        {filteredTabletPrices.slice(0, showAll ? filteredTabletPrices.length : 15).map((tabletPrice) => (
            <tr key={tabletPrice._id}>
              <td>{tabletPrice.serviceName}</td>
              <td>{tabletPrice.price}</td>
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
    </div>
  );
}

export default TabletServiceList;