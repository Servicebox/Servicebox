import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Oplata from "../../images/ruble.svg";
import Sbp from "../../images/MNP.svg";
import Beznal from "../../images/Payment methods.svg";
import Dolyami from '../../images/Dolyame.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__info">
          <div className="company-info">
            <h2 className="info-title">Реквизиты компании</h2>
            <p className="footer__text">
              Название организации: ООО "СЕРВИС БОКС"<br />
              ИНН: 3525475916<br />
              КПП: 352501001<br />
              ОГРН: 1213800018522
            </p>
          </div>
 <div className="footer-links">
    <h3 className="footer-link-title"> Дубль по всем услугам, ценам, фото. Пишите в чат, если есть вопросы </h3>
    <ul>
      <li><Link to="/services" className="header-nav-link">Услуги</Link></li>
       <li><Link to="/image-gallery-api" className="header-nav-link">Фото</Link></li>
       <li><Link to="/news" className="dropdown-item">Блог</Link></li>
      <li><Link to="/image-gallery-api" className="header-nav-link">Фото</Link></li>
      <li><Link to="/news" className="dropdown-item">Блог</Link></li>
      <li><Link to="/promotions-page" className="dropdown-item">Акции</Link></li>
      <li><Link to="/depository-public" className="dropdown-item">Схемы/Bios</Link></li>
    </ul>
  </div>
          <Link to="/privacy-policy" className="privacy-link">
            Политика конфиденциальности
          </Link>
        </div>
        <div className="payment-section">
          <h3 className="payment-title">Удобные способы оплаты</h3>
          <div className="payment-methods">
            <img className="payment-logo"
            loading="lazy"
            src={Beznal} alt="Безналичный расчет" />
            <img className="payment-logo"
            loading="lazy"
            src={Sbp} alt="СБП" />
            <img className="payment-logo" src={Dolyami} alt="Долями" />
            <img className="payment-logo" src={Oplata} alt="Наличные" />
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__author">&copy; Кознова T.А. 2023</p>
      </div>
    </footer>
  );
}

export default Footer;