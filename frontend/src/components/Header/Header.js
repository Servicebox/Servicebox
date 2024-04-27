import React, { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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

import { faVk, faTelegram, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import Form from '../Form/Form';
import Contacts from "../Contacts/Contacts";


function Header() {

  gsap.registerPlugin(ScrollToPlugin);
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const scrollTo = (target) =>
  gsap.to(window, { duration: 1, scrollTo: target });
  const toggleForm = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleEsc = (event) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);




  ///
  let isFirefox = typeof InstallTrigger !== 'undefined';
const words = "SERVICEBOXSERVICEBOX";

let ANGLE = 360;
const ANIMATION_DURATION = 4000;

const animation = () => {
  ANGLE -= 1; // Incremento do ângulo
  document.querySelectorAll(".spiral *").forEach((el, i) => {
    
    const translateY = Math.sin(ANGLE * (Math.PI / 120)) * 100;
    const scale = Math.cos(ANGLE * (Math.PI / 120)) * 0.5 + 0.5;
    
    
    const offset = parseInt(el.dataset.offset);
    const delay = i * (ANIMATION_DURATION / 16) - offset;

    setTimeout(() => {
      el.style.transform = `translateY(${translateY}px) scale(${scale})`;
    }, delay);
  });

  requestAnimationFrame(animation);
};



useEffect(() => {
  const isFirefox = typeof InstallTrigger !== 'undefined';
  const words = "SERVICEBOXSERVICEBOX";
  let ANGLE = 360;
  const ANIMATION_DURATION = 4000;

  const createElements = () => {
    words.split("").forEach((char, i) => {
      const createElement = (offset) => {
        const div = document.createElement("div");
        div.innerText = char;
        div.classList.add("character");
        div.setAttribute("data-offset", offset);
        div.style.animationDelay = `-${i * (ANIMATION_DURATION / 16) - offset}ms`;
        return div;
      };

      document.querySelector("#spiral").append(createElement(0));
      document.querySelector("#spiral2").append(createElement((isFirefox ? 1 : -1) * (ANIMATION_DURATION / 2)));
    });
  };

  createElements();
}, []);
// @property CSS doesn't work in Firefox, so it must be animated using JavaScript.
if(isFirefox){
  animation();
}
///

  const handleShowMap = () => {
    window.open(
      "https://yandex.ru/maps/org/servisboks/58578899506/?ll=39.929033%2C59.216813&z=13",
      "_blank",
      { passive: false }
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
        <div className="container__contacts" > 
        <nav className="navigation">
            <ul className="navigation__lists">
            <li className="navigation__list ">
            <Link className="navigation__list" to="/contacts">
          <h3 className="card__subtitle-img">контакты</h3>
          </Link>
</li>
              <li className={`navigation__list ${location.pathname === "/about" ? "active" : ""}`}>
  <a onClick={() => scrollTo(aboutRef)}>О компании</a>
</li>
<li className={`nav__list ${location.pathname === "/service" ? "active" : ""}`}>
  <a className="nav__list-foto" onClick={() => scrollTo(serviceRef)}>Наши услуги</a>
</li>
<li>           
  <Link className="navigation__list" to="/image-gallery-api">
          <h3 className="card__subtitle-img">фото</h3>
          </Link>

</li>
            </ul>

          </nav>
        
          <div className="contacts__block">
          <ul className="contacts__icon">
          <li className="contacts__icon-sochial pulse-one">
            <a href="https://vk.com/servicebox35">
              <FontAwesomeIcon icon={faVk} />
              <span>VK</span>
            </a>
          </li>
          <li className="contacts__icon-sochial pulse-two">
            <a href="whatsapp://send?phone=79062960353">
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>Watsapp</span>
            </a>
          </li>
          <li className="contacts__icon-sochial pulse-three">
            <a href="tg://resolve?domain=@Tomkka">
              <FontAwesomeIcon icon={faTelegram} />
              <span>Telegram</span>
            </a>
          </li>
          </ul>
        </div>
        <div className="content-holder"><span className="heading-span">Часы работы</span><br /><span>Понедельник-Пятница <br />(10:00 - 19:00)</span></div>
        </div>
        <div className="header__top">
        <div className="header__links">
        <li><Link to="/"  className="form__logo" >
            <img src={headerLogo} alt="Логотип сайта" className="logo" />
          </Link>
          </li>
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
            <a className="button" href="https://app.helloclient.io/check.html#250362" target="_blank" rel="noopener noreferrer">
              <img src={Status} alt="Кнопка" />
              <span className="button-text">CТАТУС РЕМОНТА</span>
            </a>
            <div className="">
 

 <BurgerMenu scrollTo={scrollTo} />
</div>
</div>

      
          <div className="header__links">
          {/*<button className="create__btn" onClick={openModal}>Создать услугу</button>*/}
   

          </div>
        </div>

        <div className="header__links">
          {/* <Link to="/profile" className="header__account-btn"> аккаунт </Link> */}
        </div>
   
      {isModalOpen && (
        <div className="modal">
          <div className="modal__overlay" onClick={closeModal}></div> 
          <div className="modal__content">
            <CreateServiceForm />
            <button className="modal__close-btn"
             onClick={closeModal}>
              Закрыть</button>
          </div>
        </div>
)}
          
          
        <div className="mainHeading__content">
      <article className="mainHeading__text">
         <p className="mainHeading__preTitle">всегда на связи с вами</p>
         <h2 className="mainHeading__title">Проблемы с утройством?</h2>
         <p className="mainHeading__description">
         Решаем любые проблемы! Большой склад и опытные мастера
         </p>
         <button className="main-banner__form" onClick={toggleForm}>
          <span className='title-span'>Бесплатная консультация</span> 
          </button>
      </article>
      {isOpen && <Form toggleForm={toggleForm} />}

  <div className="mainHeading__image" >
      <div  className="spiral__anim" id="spiral"></div>
<div className="spiral__anim" id="spiral2"></div>
  </div>  
   </div>

    </header>
  );
}

export default Header;