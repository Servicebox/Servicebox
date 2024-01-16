import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./NotebookService.css"
import Search from "../../Search/Search"

const NotebookServiceList = () => {
  const [notebookPrices, setNotebookPrices] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


  useEffect(() => {
    const getCategoryNotebookPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Ноутбук');
        setNotebookPrices(response.data);
      } catch (error) {
        console.error('Error fetching Notebook replacement prices: ', error);
      }
    };
    getCategoryNotebookPrices();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };


  const filteredNotebookPrices = notebookPrices.filter((notebookPrice) => {
    return notebookPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });



  return (
    <div className='notebook'>
      <h1 className='notebook__title'>Цены на работу по ремноту ноутбуков, системных блоков, моноблоков </h1>
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
        {filteredNotebookPrices.slice(0, showAll ? filteredNotebookPrices.length : 15).map((notebookPrice) => (
            <tr key={notebookPrice._id}>
              <td>{notebookPrice.serviceName}</td>
              <td>{notebookPrice.price}</td>
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

export default NotebookServiceList;