import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMobilePhone,
  faMailBulk,
  faMapLocation,
  faTimes,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { faVk, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ShopContext } from '../Contexst/ShopContext';
import "./BurgerMenu.css";
import logoImage from "../../images/Servicebox6.svg";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();

useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleContactAction = (action) => {
    toggleMenu();
    if (action === 'tel') window.location.href = "tel:+79115018828";
    if (action === 'mail') window.location.href = "mailto:servicebox35@gmail.com";
  };

  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <button
        className={`burger-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon icon={faBars} className="burger-icon" />
        <FontAwesomeIcon icon={faTimes} className="close-icon" />
      </button>

      <div className="menu-overlay" onClick={toggleMenu}></div>

      <nav className="menu-content" aria-label="Мобильное меню">
        <div className="menu-header">
          <img 
            className="menu-logo" 
            loading="lazy"
            src={logoImage} 
            alt="ServiceBox Logo" 
          />
        </div>

        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/contacts" className="menu-link" onClick={toggleMenu}>Контакты</Link>
          </li>
          <li className="menu-item">
            <Link to="/about" className="menu-link" onClick={toggleMenu}>О нас</Link>
          </li>
          <li className="menu-item">
            <Link to="/service" className="menu-link" onClick={toggleMenu}>Услуги</Link>
          </li>
          <li className="menu-item">
            <Link to="/image-gallery-api" className="menu-link" onClick={toggleMenu}>Фото</Link>
          </li>
          <li className="menu-item">
            <Link to="/parts" className="menu-link" onClick={toggleMenu}>Каталог товаров</Link>
          </li>
          <li className="menu-item">
            <Link to="/news" className="menu-link" onClick={toggleMenu}>Новости</Link>
          </li>
          <li className="menu-item">
            <Link to='/promotions-page' className="menu-link" onClick={toggleMenu}>Акции</Link>
          </li>
          <li className="menu-item">
            <Link to="/depository-public" className="menu-link" onClick={toggleMenu}>Схемы/Bios</Link>
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
            <a 
  href="https://vk.com/servicebox35" 
  className="social-link vk" 
  target="_blank" 
  rel="noopener noreferrer"
  aria-label="Написать нам в ВКонтакте"
>
  <FontAwesomeIcon icon={faVk} />
</a>
            <a 
  href="https://wa.me/79062960353" 
  className="social-link whatsapp" 
  target="_blank" 
  rel="noopener noreferrer"
  aria-label="Написать нам в WhatsApp"
>
  <FontAwesomeIcon icon={faWhatsapp} />
</a>
            <a 
  href="https://t.me/Tomkka" 
  className="social-link telegram" 
  target="_blank" 
  rel="noopener noreferrer"
  aria-label="Написать нам в Telegram"
>
  <FontAwesomeIcon icon={faTelegram} />
</a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default BurgerMenu;