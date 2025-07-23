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
    <div className='glass-container'>
      <div className="glass-header">
        <h1 className='glass-title'>Ремонт видеорегистраторов, роботов-пылесосов, игровых приставок Sony Playstation, X-box, геймпадов, Bluetooth-колонок, электронных книг, Яндекс станции  </h1>
        <div className="glass-badge">Цены на ремонт</div>
      </div>

      <div className="glass-content">
        <div className="glass-process">
          <h2 className="process-title">Этапы</h2>
          <p className="process-description">
            
          </p>
          
          <div className="process-steps">
            <div className="step-card">
                 <div className="step-number">1</div>
              <h3 className="step-title">Бесплатная диагностика</h3>
              <p className="step-text">Точное определение неисправности с помощью профессионального оборудования</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Подбор комплектующих</h3>
              <p className="step-text">Подбор оригинальных или качественных аналоговых запчастей</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Согласование с клиентом</h3>
              <p className="step-text">Утверждение стоимости и сроков ремонта перед началом работ</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3 className="step-title">Профессиональный ремонт</h3>
              <p className="step-text">Выполнение работ в чистой лаборатории с антистатической защитой</p>
            </div>
            <div className="step-card">
              <div className="step-number">5</div>
              <h3 className="step-title">Тестирование устройства</h3>
              <p className="step-text">Проверка всех функций устройства после ремонта</p>
            </div>
            <div className="step-card">
              <div className="step-number">6</div>
               <h3 className="step-title">Гарантия от 1 месяца до 6 мес</h3>
              <p className="step-text">Официальная гарантия на все виды работ и установленные компоненты</p>
            </div>
          </div>
          
          <p className="process-result">
            После выполнения всех процедур ремонта ваш аппарат снова в рабочем состоянии. 
          </p>
        </div>

        <div className="pricing-section">
          <div className="pricing-header">
            <div className="pricing-info">
              <h3>Цены</h3>
              <p>По другим моделям уточняйте по номеру <span className="highlight">8911 501 88 28</span></p>
            </div>
            <Search 
              value={searchQuery} 
              onChange={handleSearch} 
              placeholder="Поиск по модели"
              className="modern-search"
            />
          </div>

          <div className="price-table-container">
            <div className="price-table">
              <div className="table-header">
                <div className="header-cell">Модель устройства</div>
                <div className="header-cell">Стоимость</div>
              </div>
              <div className="table-body">
                {filteredOtherPrices.slice(0, showAll ? filteredOtherPrices.length : 15).map((otherPrice) => (
                  <div className="table-row" key={otherPrice._id}>
                    <div className="row-cell device-cell">
                      <span className="device-icon">📱</span>
                      {otherPrice.serviceName}
                    </div>
                    <div className="row-cell price-cell">
                      <div className="price-badge">{otherPrice.price} ₽</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="table-controls">
            {!showAll ? (
              <button className="show-more-btn" onClick={handleShowAll}>
                <span>Показать все модели</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 15L12 8L19 15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            ) : (
              <button className="show-less-btn" onClick={handleHideAll}>
                <span>Свернуть список</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="additional-info">
        <p className="info-note">* Время ремонта может меняться в зависимости от модели устройства и сложности работ</p>
        <p className="legal-note">Информация о ценах доступна в сервисных центрах Servicebox. Не является публичной офертой.</p>
      </div>

      <div className="navigation-links">
        <Link to="/" className="home-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2"/>
          </svg>
          На главную
        </Link>
      </div>
    </div>
  );
}


export default OtherServiceList;