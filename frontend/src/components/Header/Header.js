import React from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import headerLogo from "../../images/Servicebox6.svg";
import locationIcon from "../../images/location.svg";
import "./Header.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Status from "../../images/status.svg";

function Header({ scrollTo }) {
 const location = useLocation();

 const handleShowMap = () => {
  window.open(
    "https://yandex.ru/maps/org/servisboks/58578899506/?ll=39.929033%2C59.216813&z=13",
    "_blank",
    { passive: true }
  );
};

  const handleScrollTo = (target) => {
    scrollTo(target);
  };

  return (
    <header className="header" id="header">
      <div className="container container__main">
        <div className="header__top">
          <Link to="/" className="form__logo">
            <img src={headerLogo} alt="Логотип сайта" className="logo" />
          </Link>

          <nav className="navigation">
            <ul className="navigation__lists">
              <li className={`navigation__list ${location.pathname === "/service" ? "active" : ""}`}>
                <Link to="/service" onClick={() => handleScrollTo(serviceRef)}
                onTouchEnd={() => handleScrollTo(serviceRef)}
                >Наши услуги</Link>
              </li>
              <li className={`navigation__list ${location.pathname === "/about" ? "active" : ""}`}>
                <Link to="/about" onClick={() => handleScrollTo(aboutRef)}
                 onTouchEnd={() => handleScrollTo(aboutRef)}
                >О компании</Link>
              </li>
              <li className={`navigation__list ${location.pathname === "/contacts" ? "active" : ""}`}>
                <Link to="/contacts" onClick={() => handleScrollTo(contactsRef)}
                 onTouchEnd={() => handleScrollTo(contactsRef)}
                >Контакты</Link>
              </li>
            </ul>
 
          </nav>
          <div className="nav__btn">
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

          <div className="contact-info">
            <img src={locationIcon} alt="Локация" className="location" />
            <p className="contact-info__map-link" onClick={handleShowMap}>
              <span className="contact-info__location">
                Адрес: г.Вологда, ул. Северная 7А, 405
              </span>
              Мы на карте
            </p>
            <p className="contact-info__number">+7 911 501 88 28</p>
          </div>

          <BurgerMenu scrollTo={scrollTo} />
        </div>

        <div className="header__middle">
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
      </div>
    </header>
  );
}

export default Header;