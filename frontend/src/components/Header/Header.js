import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from '../Contexst/ShopContext';
import headerLogo from "../../images/Servicebox6.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import LoginSignup from "../pages/LoginSignup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faMobilePhone,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faVk, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./Header.css";

function Header() {
  const { getTotalCartItems, isAuthenticated, setIsAuthenticated } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState("shop");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const userMenuRef = useRef();

  useEffect(() => {
    setRole(localStorage.getItem('role') || '');
    setUsername(localStorage.getItem('username') || '');
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/contacts')) setMenu("contacts");
    else if (path.includes('/about')) setMenu("about");
    else if (path.includes('/prices')) setMenu("price-list");
    else if (path.includes('/image-gallery-api')) setMenu("gallery");
    else if (path.includes('/parts')) setMenu("parts");
    else if (path.includes('/news')) setMenu("newsdetail");
    else if (path.includes('/promotions-page')) setMenu("promotionspage");
    else if (path.includes('/depository-public')) setMenu("depository");
    else if (path.includes('/chat-with-gpt')) setMenu("chatwithgpt");
    else setMenu("shop");
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setRole(localStorage.getItem('role') || '');
    setUsername(localStorage.getItem('username') || '');
    setIsLoginOpen(false);
    
    if (localStorage.getItem('role') === "admin") {
      navigate("/admin-panel");
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRole('');
    setUsername('');
    setShowUserMenu(false);
    navigate("/");
  };

  const UserDropdownMenu = () => (
    <div className="user-menu-dropdown" ref={userMenuRef}>
      <Link to="/profile" onClick={() => setShowUserMenu(false)}>Мои данные</Link>
      <Link to="/profile#orders" onClick={() => setShowUserMenu(false)}>Мои заказы</Link>
      <button className="user-menu-logout" onClick={logout}>Выход</button>
    </div>
  );

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <>
      <div className={`header-top-bar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-top-bar__container">
          <div className="header-contacts">
            <a href="tel:+79115018828" className="header-contact-link">
              <FontAwesomeIcon icon={faMobilePhone} />
              <span>+7 (911) 501-88-28</span>
            </a>
            <a href="tel:+79115010696" className="header-contact-link">
              <FontAwesomeIcon icon={faMobilePhone} />
              <span>+7 (911) 501-06-96</span>
            </a>
            <span className="header-work-hours">Пн-Пт: 10:00 - 19:00</span>
          </div>

          <div className="header-socials">
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
      </div>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header__container">
          <Link to="/" className="header-logo-link" aria-label="На главную страницу ServiceBox">
            <img 
              src={headerLogo} 
              alt="Логотип ServiceBox - ремонт техники в Вологде" 
              className="header-logo" 
              width="65" 
              height="45" 
            />
            <span className="header-logo-text">
              <span className="header-logo-main">ServiceBox</span>
              <span className="header-logo-sub">Вологда</span>
            </span>
          </Link>

          <nav className="header-nav" aria-label="Основная навигация">
            <ul className="header-nav-list">
              <li className={`header-nav-item ${menu === "about" ? 'active' : ''}`}>
                <Link to="/about" className="header-nav-link">О нас</Link>
              </li>
              <li className={`header-nav-item ${menu === "parts" ? 'active' : ''}`}>
                <Link to="/parts" className="header-nav-link">Каталог</Link>
              </li>
              <li className={`header-nav-item ${menu === "prices" ? 'active' : ''}`}>
                <Link to="/prices" className="header-nav-link">Цены</Link>
              </li>
              <li className={`header-nav-item ${menu === "gallery" ? 'active' : ''}`}>
                <Link to="/image-gallery-api" className="header-nav-link">Фото</Link>
              </li>
              <li className="header-nav-item dropdown">
                <button className="header-nav-link dropdown-toggle" aria-haspopup="true">
                  Ещё <FontAwesomeIcon icon={faChevronDown} size="xs" />
                </button>
                <ul className="dropdown-menu">
                  <li><Link to="/news" className="dropdown-item">Блог</Link></li>
                  <li><Link to="/promotions-page" className="dropdown-item">Акции</Link></li>
                  <li><Link to="/depository-public" className="dropdown-item">Схемы/Bios</Link></li>
                  <li>
                    <a 
                      href="https://pm-31768.promaster.app/index_cl" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="dropdown-item external-link"
                    >
                      Статус ремонта
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            {isAuthenticated ? (
              <div className="nav-user-group">
                <Link to="/profile" className="nav-user-icon" aria-label="Личный кабинет">
                  <FontAwesomeIcon icon={faUser} />
                  {!isMobile && <span className="nav-username">{username || (role === "admin" ? "Админ" : "Пользователь")}</span>}
                </Link>

                {role === "admin" && (
                  <Link to="/admin-panel" className="admin-panel-btn" aria-label="Админ-панель">
                    Админка
                  </Link>
                )}

                <button className="logout-btn" onClick={logout} aria-label="Выйти">
                  Выйти
                </button>
              </div>
            ) : (
              <button className="header-login-btn" onClick={() => setIsLoginOpen(true)}>
                Вход
              </button>
            )}

            <Link to="/cart" className="header-cart-link" aria-label="Корзина">
              <FontAwesomeIcon icon={faBasketShopping} />
              {getTotalCartItems() > 0 && (
                <span className="header-cart-count">{getTotalCartItems()}</span>
              )}
            </Link>

            <BurgerMenu />
          </div>
        </div>
      </header>

      <LoginSignup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default Header;