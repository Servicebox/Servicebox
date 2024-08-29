import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import cross_icon from '../Assets/cross_icon.png';
import { ShopContext } from '../Contexst/ShopContext'; // Импортируйте ваш контекст
import "./ListService.css"

const ListService = () => {
  const [servicesPrices, setServicesPrices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getCategoryServicesPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services');
        setServicesPrices(response.data);
      } catch (error) {
        console.error('Error fetching services prices: ', error);
      }
    };
    getCategoryServicesPrices();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };

  const filteredPrices = servicesPrices.filter((servicesPrice) =>
    servicesPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='list-service'>
      <p>Список услуг</p>
      <div className='listservice-format-main'>
        <p>Услуга</p>
        <p>Описание</p>
        <p>Цена</p>
        <p>Удалить</p>
      </div>
      <div className='listservice-allpservice'>
        <hr />
        {filteredPrices.slice(0, showAll ? filteredPrices.length : 15).map((servicesPrice) => (
          <div key={servicesPrice._id} className='listservice-format-main listservice-format'>
            <p>{servicesPrice.serviceName}</p>
            <p>{servicesPrice.description}</p>
            <p>{servicesPrice.price}</p>
            <p>{servicesPrice.category}</p>
            <img onClick={() => { /* Ваша логика удаления услуги */ }} 
                 className='listservice-remove-icon' 
                 src={cross_icon} 
                 alt='Удалить' />
          </div>
        ))}
        {!showAll ? (
          <button className='glass__btn-active' onClick={handleShowAll}>Посмотреть прайс</button>
        ) : (
          <button className='glass__btn' onClick={handleHideAll}>Скрыть прайс</button>
        )}
      </div>
    </div>
  );
}

export default ListService;