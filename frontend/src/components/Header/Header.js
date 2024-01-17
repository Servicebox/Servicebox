import React, { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import headerLogo from "../../images/Servicebox6.svg";
import locationIcon from "../../images/location.svg";
import "./Header.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Status from "../../images/status.svg";
import MiddleStatus from "../../images/status.svg";
import ServiceRef from "../Main/ServiceRef/ServiceRef";
import AboutRef from "../Main/AboutRef/AboutRef";
import ContactsRef from "../Main/ContactsRef/ContactsRef";
import CreateServiceForm from "../AdminPanel/AdminPanelRoute/CreateServiceForm"


function Header() {
  gsap.registerPlugin(ScrollToPlugin);
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const scrollTo = (target) =>
  gsap.to(window, { duration: 1, scrollTo: target });


  const handleShowMap = () => {
    window.open(
      "https://yandex.ru/maps/org/servisboks/58578899506/?ll=39.929033%2C59.216813&z=13",
      "_blank",
      { passive: true }
    );
  };

  const handlePhoneCall = () => {
    window.location.href = "tel:+7911 501 88 28";
  };
  useEffect(() => {

  }, []);

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
  <a onClick={() => scrollTo(serviceRef)}>Наши услуги</a>
</li>
              <li className={`navigation__list ${location.pathname === "/about" ? "active" : ""}`}>
  <a onClick={() => scrollTo(aboutRef)}>О компании</a>
</li>
<li className={`navigation__list ${location.pathname === "/contacts" ? "active" : ""}`}>
  <a onClick={() => scrollTo(contactsRef)}>Контакты</a>
</li>
            </ul>
          </nav>
          <div className="nav__btn">
            <a className="button" href="https://app.helloclient.io/check.html#250362" target="_blank" rel="noopener noreferrer">
              <img src={Status} alt="Кнопка" />
              <span className="button-text">CТАТУС РЕМОНТА</span>
            </a>
          </div>
          <div className="contact-info">
            <img src={locationIcon} alt="Локация" className="location" />
            <p className="contact-info__map-link" onClick={handleShowMap}>
              <span className="contact-info__location">Адрес: г.Вологда, ул. Северная 7А, 405</span>
              Мы на карте
            </p>
            <p className="contact-info__number" onClick={handlePhoneCall}>
              +7 911 501 88 28
            </p>
          </div>
          <BurgerMenu scrollTo={scrollTo} />
        </div>
        <div className="header__middle">
          <a className="button" href="https://app.helloclient.io/check.html#250362" target="_blank" rel="noopener noreferrer">
            <img src={MiddleStatus} alt="Кнопка" />
            <span className="button-text">CТАТУС РЕМОНТА</span>
          </a>
          <div className="header__links">
          {/*<button className="create__btn" onClick={openModal}>Создать услугу</button>*/}
          
            <NavLink to="/api" className="middle__links" activeclassname="active">
              Каталог товаров
            </NavLink>

          </div>
        </div>
        <div className="header__middle header__middle_links">
          {/* <Link to="/saved-products" > Товары в корзине </Link> */}
        </div>
        <div className="header__links">
          {/* <Link to="/profile" className="header__account-btn"> аккаунт </Link> */}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal__overlay" onClick={closeModal}></div> 
          <div className="modal__content">
            <CreateServiceForm />
            <button className="modal__close-btn" onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;