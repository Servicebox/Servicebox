import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketShopping,
  faMobilePhone,
  faMailBulk,
  faMapLocation,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faVk, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ShopContext } from '../Contexst/ShopContext';
import "./BurgerMenu.css";
import logoImage from "../../images/Servicebox6.svg";

function BurgerMenu({ scrollTo }) {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();

  // Закрываем меню при изменении локации
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const handleContactAction = (action) => {
    toggleMenu();
    if (action === 'tel') window.location.href = "tel:+7 911 501 88 28";
    if (action === 'mail') window.location.href = "mailto:servicebox35@gmail.com";
  };

  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <button
        className={`burger-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="burger-line top"></div>
        <div className="burger-line middle"></div>
        <div className="burger-line bottom"></div>
      </button>

      <div className="menu-overlay" onClick={toggleMenu}></div>

      <nav className="menu-content">
        <div className="menu-header">
          <img className="menu-logo" src={logoImage} alt="ServiceBox Logo" />
          <button
            className="menu-close"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/contacts" className="menu-link" onClick={toggleMenu}>
              Контакты
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/about" className="menu-link" onClick={toggleMenu}>
              О нас
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/service" className="menu-link" onClick={toggleMenu}>
              Услуги
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/image-gallery-api" className="menu-link" onClick={toggleMenu}>
              Фото
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/parts" className="menu-link" onClick={toggleMenu}>
              Каталог товаров
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/news" className="menu-link" onClick={toggleMenu}>
              Новости
            </Link>
          </li>
          <li className="menu-item" >
            <Link to='/promotions-page' className="menu-link" onClick={toggleMenu}>
              Акции
            </Link>
          </li>
          <li className=" menu-item" >
            <Link to="/depository-public" className="menu-link" onClick={toggleMenu}>
              Схемы/Bios
            </Link>
          </li>
          <li className="menu-item" >
            <Link to="/chat-with-gpt" className="menu-link" onClick={toggleMenu} >
              🤖 GPT-Чат
            </Link>
          </li>
        </ul>

        <div className="menu-footer">
          <div className="status-check">
            <a
              className="status-button"
              href="https://pm-31768.promaster.app/index_cl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Проверить статус ремонта
            </a>
          </div>

          <div className="contact-info">
            <div className="contact-item" onClick={() => handleContactAction('mail')}>
              <FontAwesomeIcon icon={faMailBulk} />
              <span>servicebox35@gmail.com</span>
            </div>

            <div className="address-block">
              <p>
                <FontAwesomeIcon icon={faMapLocation} />
                г. Вологда, ул. Северная, 7А, офис 405
              </p>
              <div className="contact-item" onClick={() => handleContactAction('tel')}>
                <FontAwesomeIcon icon={faMobilePhone} />
                <span>+7 911 501 88 28</span>
              </div>
            </div>

            <div className="address-block">
              <p>
                <FontAwesomeIcon icon={faMapLocation} />
                г. Вологда, ул. Ленина д.6, этаж 1
              </p>
              <div className="contact-item" onClick={() => handleContactAction('tel')}>
                <FontAwesomeIcon icon={faMobilePhone} />
                <span>+7 911 501 06 96</span>
              </div>
            </div>
          </div>

          <div className="social-links">
            <a href="https://vk.com/servicebox35" className="social-link vk">
              <FontAwesomeIcon icon={faVk} />
            </a>
            <a href="whatsapp://send?phone=79062960353" className="social-link whatsapp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a href="tg://resolve?domain=@Tomkka" className="social-link telegram">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default BurgerMenu;