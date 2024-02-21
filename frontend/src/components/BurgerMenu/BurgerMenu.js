import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BurgerMenu.css";
import burgerIcon from "../../images/Burger.svg";
import logoImage from "../../images/Servicebox6.svg";
import closeIcon from "../../images/x.svg";
import Status from "../../images/status.svg";
import local from "../../images/location.svg";
import MiniMail from "../../images/mail.svg";
import MiniWatsapp from "../../images/whatsapp.svg";
import MiniTelegram from "../../images/telegram.svg";
import VkMini from "../../images/vk.svg";
import MiniTelephone from "../../images/phonecol.svg";



function BurgerMenu({ scrollTo }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScrollTo = (target) => {
    scrollTo(target);
    toggleMenu();
  };
  const handlePhoneCall = () => {
    window.location.href = "tel:+7 911 501 88 28"; 
  };

  const handleMailTo = () => {
    window.location.href = "mailto:servicebox35@gmail.com"; 
  };

  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <div className="overlay" onClick={toggleMenu}></div>
      <div className="content">
        <button className="close-btn" onClick={toggleMenu}>
          <img src={closeIcon} alt="Закрыть" />
        </button>
        <img className="logo-burger" src={logoImage} alt="Логотип" />
        <nav className="navigation__list">
          <ul className="burger-menu__list">
          <li className={`burger-menu__item ${location.pathname === "/service" ? "active" : ""}`}>
              <a onClick={() => handleScrollTo(serviceRef)}>Наши услуги</a>
            </li>
            <li className={`burger-menu__item ${location.pathname === "/about" ? "active" : ""}`}>
              <a onClick={() => handleScrollTo(aboutRef)}>О компании</a>
            </li>
            <li className={`burger-menu__item ${location.pathname === "/contacts" ? "active" : ""}`}>
              <a onClick={() => handleScrollTo(contactsRef)}>Контакты</a>
            </li>
   
          </ul>
          <div className="header__links header__links-burger">
        
          </div>
          <div className="nav__button">
          <a
            className="button"
            href="https://app.helloclient.io/check.html#250362"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Status} alt="Кнопка" />
            <span className="button-text">CТАТУС РЕМОНТА</span>
          </a>
        </div>
        <div className="burger-contacts ">
        <div onClick={handlePhoneCall} className="contacts__block">
          <img src={MiniTelephone} className="contacts__image" alt="Telephone" />
          <p className="contacts__text">+7 911 501 88 28</p>
        </div>
        <div onClick={handleMailTo} className="contacts__block">
          <img src={MiniMail} className="contacts__image" alt="Mail" />
          <p className="contacts__text">servicebox35@gmail.com</p>
        </div>
          <div className="contacts__block">
          <img src={local} className="contacts__image" alt="Location" />
          <p className="contacts__text">г. Вологда, ул. Северная, 7А, офис 405</p>
        </div>
      </div>
      <div className="contacts__block-sochial">
          <ul className="contacts__icon">
            <li className="contacts__icon-sochial pulse-one">
              <a href="https://vk.com/servicebox35">
                <img className="contacts__image-sochial" src={VkMini} alt="Вконтакте" />
              </a>
            </li>
            <li className="contacts__icon-sochial pulse-two">
              <a href="whatsapp://send?phone=79062960353">
                <img className="contacts__image-sochial" src={MiniWatsapp} alt="Вотсапп" />
              </a>
            </li>
            <li className="contacts__icon-sochial pulse-three">
              <a href="tg://resolve?domain=@Tomkka">
                <img className="contacts__image-sochial" src={MiniTelegram} alt="Телеграм" />
              </a>
            </li>
          </ul>
        </div>
        </nav>
      </div>
      {!isOpen && (
        <img
          className="burger-icon"
          src={burgerIcon}
          alt="Кнопка бургера"
          onClick={toggleMenu}
        />
      )}

    </div>

  );
}

export default BurgerMenu;