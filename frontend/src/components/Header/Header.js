import React, { useState, useCallback, useRef, useEffect, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation, NavLink} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBasketShopping, faMobilePhone} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import headerLogo from "../../images/Servicebox6.svg";
import "./Header.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Status from "../../images/status.svg";
import CreateServiceForm from "../AdminPanel/AdminPanelRoute/CreateServiceForm"
import { ShopContext } from '../Contexst/ShopContext';
import { faVk, faTelegram, faWhatsapp} from '@fortawesome/free-brands-svg-icons';


function Header() {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
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
          <li><Link to="/"  className="form__logo" >
            <img src={headerLogo} alt="Логотип сайта" className="logo" />
          </Link>
          </li>
        
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
                <div className="contact-info">
            <p className="contact-info__map-link" onClick={handleShowMap}>
              <span className="contact-info__location">Адреса: г.Вологда, ул. Северная 7А, 405 и ул.Ленина 6</span>
            </p>
          </div>
                    <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>выйти</button>
            :<Link to='/login'><button>Вход</button></Link>}           
              <Link to='/cart'> <FontAwesomeIcon icon={faBasketShopping} /></Link>
              <div className="nav-cart-count">{getTotalCartItems()}</div>    
      </div>
      <BurgerMenu scrollTo={scrollTo} />
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
        </div>
        <div className="header__top">
          <nav className="navigation">
  <p className="contact-info__number" onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
  <FontAwesomeIcon icon={faMobilePhone} style={{ marginRight: '3px' }} />
  +7 911 501 88 28
</p>
<ul className="navigation__lists">
  <li className="navigation__list" onClick={() => setMenu("contacts")}>
    <Link className="navigation__list" to="/contacts">
      Контакты {menu === "contacts" && <hr/>}
    </Link>
  </li>
  <li className="navigation__list" onClick={() => setMenu("about")}>
    <Link className="navigation__list" to="/about">
      О нас {menu === "about" && <hr/>}
    </Link>
  </li>
  <li className="navigation__list" onClick={() => setMenu("service")}>
    <Link className="navigation__list" to="/service">
      Услуги {menu === "service" && <hr/>}
    </Link>
  </li>
  <li className="navigation__list" onClick={() => setMenu("gallery")}>
    <Link className="navigation__list" to="/image-gallery-api">
      Фото {menu === "gallery" && <hr/>}
    </Link>
  </li>
</ul>
    <ul className='nav-menu'>
    <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration:'none'}} to='https://ru.servicebox.shop/' target="_blank" rel="noopener noreferrer">Магазин</Link>{menu==="shop"?<hr/>:<></>} </li>
    <li onClick={()=>{setMenu("parts")}}> <Link style={{textDecoration:'none'}} to='/parts'>Запчасти для СЦ</Link>{menu==="parts"?<hr/>:<></>} </li>
    <li onClick={()=>{setMenu("electronics")}}> <Link style={{textDecoration:'none'}} to='/electronics'>Акксессуары</Link>{menu==="electronics"?<hr/>:<></>} </li>
    <li onClick={()=>{setMenu("usedspareparts")}}><Link style={{textDecoration:'none'}} to='/usedspareparts'> б/у запчсти</Link>{menu==="usedspareparts"?<hr/>:<></>} </li>
  </ul>
    <a className="button" href="https://app.helloclient.io/check.html#250362" target="_blank" rel="noopener noreferrer">
              <img src={Status} alt="Кнопка" />
              <span className="button-text">CТАТУС РЕМОНТА</span>
            </a>
          </nav>
        <div className="list-header">
          </div>
</div>
    </header>
  );
}

export default Header;