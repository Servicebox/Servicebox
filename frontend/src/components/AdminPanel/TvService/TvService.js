import React, { useState, useEffect } from 'react';
import "./TvService.css"
import axios from 'axios';
import Search from "../../Search/Search"

const TvServiceList = () => {
  const [tvPrices, setTvPrices] = useState([]);


  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


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



  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };

  const filteredTvPrices = tvPrices.filter((tvPrice) => {
    return tvPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });


  return (
    <div className='tv'>
      <h1 className='tv__title'>Цены на работу по ремноту телевизоров и мониторов </h1>
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
        {filteredTvPrices.slice(0, showAll ? filteredTvPrices.length : 15).map((tvPrice) => (
            <tr key={tvPrice._id}>
              <td>{tvPrice.serviceName}</td>
              <td>{tvPrice.price}</td>
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

export default TvServiceList;