import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation, NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "./BurgerMenu.css";
import burgerIcon from "../../images/Burger.svg";
import logoImage from "../../images/Servicebox6.svg";
import closeIcon from "../../images/x.svg";
import Status from "../../images/status.svg";
import { faBasketShopping, faMobilePhone, faMailBulk, faMapLocation} from '@fortawesome/free-solid-svg-icons';
import { faVk, faTelegram, faWhatsapp} from '@fortawesome/free-brands-svg-icons';

import { ShopContext } from '../Contexst/ShopContext';



function BurgerMenu({ scrollTo }) {
  const [isOpen, setIsOpen] = useState(false);
const [burgerOpen, setBurgerOpen] = useState(false);
    const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
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

const toggleBurgerMenu = () => {
  setBurgerOpen(!burgerOpen);
  if (!burgerOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
};



  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <div className="overlay" onClick={toggleMenu}></div>
      <div className="content">
        <button className="close-btn" onClick={toggleMenu}>
          <img src={closeIcon} alt="Закрыть" />
        </button>
        <img className="logo-burger" src={logoImage} alt="Логотип" />
        <nav className="navigation-lists">
        <ul className="burger-menu__list">
        <li className="navigation__list-brg ">
            <Link className="navigation__list" to="/contacts">
          <h3 className="card__subtitle-img">контакты</h3>
          </Link>
</li>
<li className="navigation__list-brg  ">
            <Link className="navigation__list" to="/about">
          <h3 className="card__subtitle-img">О нас</h3>
          </Link>
</li>
<li className="navigation__list-brg  ">
            <Link className="navigation__list" to="/service">
          <h3 className="card__subtitle-img">Услуги</h3>
          </Link>
</li>
<li  className="navigation__list-brg ">
  <Link className="navigation__list" to="/image-gallery-api">
          <h3 className="card__subtitle-img">фото</h3>
          </Link>

</li>
 <ul className='nav-menu-brg'>
    <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration:'none'}} to='/Shop'>Магазин</Link>{menu==="shop"?<hr/>:<></>} </li>
    <li onClick={()=>{setMenu("parts")}}> <Link style={{textDecoration:'none'}} to='/parts'>Запчасти</Link>{menu==="parts"?<hr/>:<></>} </li>
    <li onClick={()=>{setMenu("electronics")}}> <Link style={{textDecoration:'none'}} to='/electronics'>Электроника</Link>{menu==="electronics"?<hr/>:<></>} </li>
    <li onClick={()=>{setMenu("usedspareparts")}}><Link style={{textDecoration:'none'}} to='/usedspareparts'> б/у запчсти</Link>{menu==="usedspareparts"?<hr/>:<></>} </li>
  </ul>
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
    <p className="contact-text" onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
  <FontAwesomeIcon icon={faMobilePhone} style={{ marginRight: '5px' }} />
  +7 911 501 88 28
</p>
        </div>
        <div onClick={handleMailTo} className="contacts__block">
  <p className="contacts__text">
        <FontAwesomeIcon icon={faMailBulk} style={{ marginRight: '5px' }} />
          servicebox35@gmail.com</p>
        </div>
          <div className="contacts__block">
  <p className="contacts__text">
          <FontAwesomeIcon icon={faMapLocation} style={{ marginRight: '5px' }} />
         г. Вологда, ул. Северная, 7А, офис 405</p>
        </div>
      </div>
      <div className="contacts__block-sochial">
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