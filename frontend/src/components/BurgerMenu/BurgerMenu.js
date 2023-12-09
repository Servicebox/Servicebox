import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BurgerMenu.css";
import burgerIcon from "../../images/Burger.svg";
import logoImage from "../../images/Servicebox6.svg";
import closeIcon from "../../images/x.svg";
import Status from "../../images/status.svg";


function BurgerMenu({ scrollTo, serviceRef, aboutRef, contactsRef }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScrollTo = (target) => {
    scrollTo(target);
    toggleMenu();
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
            <li className="burger-menu__item">
              <Link to="/service" onClick={() => handleScrollTo(serviceRef)}>
                Наши услуги
              </Link>
            </li>
            <li className="burger-menu__item">
              <Link to="/about" onClick={() => handleScrollTo(aboutRef)}>
                О компании
              </Link>
            </li>
            <li className="burger-menu__item">
              <Link to="/contacts" onClick={() => handleScrollTo(contactsRef)}>
                Контакты
              </Link>
            </li>
          </ul>
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