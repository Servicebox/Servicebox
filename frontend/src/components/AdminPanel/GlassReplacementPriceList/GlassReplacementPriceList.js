import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./GlassReplacementPriceList.css"
import Search from "../../Search/Search"
import { Link } from "react-router-dom";

const GlassReplacementPriceList = () => {
  const [glassPrices, setGlassPrices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const getCategoryGlassPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Замена стекла на телефонах');
        setGlassPrices(response.data);
      } catch (error) {
        console.error('Error fetching glass replacement prices: ', error);
      }
    };
    getCategoryGlassPrices();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };

  const filteredGlassPrices = glassPrices.filter((glassPrice) => {
    return glassPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className='glass-container'>
      <div className="glass-header">
        <h1 className='glass-title'>Замена стекла на iPhone, Apple Watch, Samsung</h1>
        <div className="glass-badge">Цены на замену стекла</div>
      </div>

      <div className="glass-content">
        <div className="glass-process">
          <h2 className="process-title">Процесс замены стекла</h2>
          <p className="process-description">
            Замена стекла на телефоне производится в течении дня, если аппарат сдали до 13-00! 
            Замена стекла необходима когда разбился тачскрин, на нем появились трещины, сколы, глубокие царапины.
          </p>
          
          <div className="process-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <p className="step-text">Разбираем устройство и аккуратно извлекаем дисплей</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <p className="step-text">Расслаиваем дисплей на сепараторе при температуре -150°C</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <p className="step-text">Удаляем остатки старого клея специальными жидкостями</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <p className="step-text">В беспылевой камере наносим новую OCA пленку и стекло</p>
            </div>
            <div className="step-card">
              <div className="step-number">5</div>
              <p className="step-text">Ламинация под давлением 5 атмосфер для удаления пузырьков</p>
            </div>
            <div className="step-card">
              <div className="step-number">6</div>
              <p className="step-text">Сборка устройства и финальное тестирование</p>
            </div>
          </div>
          
          <p className="process-result">
            После выполнения всей процедуры замены стекла ваш дисплей снова в рабочем состоянии и без трещин. 
            Стоимость такого ремонта будет в разы ниже установки нового дисплея.
          </p>
        </div>

        <div className="pricing-section">
          <div className="pricing-header">
            <div className="pricing-info">
              <h3>Цены на замену стекла</h3>
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
                {filteredGlassPrices.slice(0, showAll ? filteredGlassPrices.length : 15).map((glassPrice) => (
                  <div className="table-row" key={glassPrice._id}>
                    <div className="row-cell device-cell">
                      <span className="device-icon">📱</span>
                      {glassPrice.serviceName}
                    </div>
                    <div className="row-cell price-cell">
                      <div className="price-badge">{glassPrice.price} ₽</div>
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

export default GlassReplacementPriceList;