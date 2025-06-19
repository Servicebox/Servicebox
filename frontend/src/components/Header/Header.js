import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from '../Contexst/ShopContext';
import headerLogo from "../../images/Servicebox6.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import LoginSignup from "../pages/LoginSignup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faMobilePhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { faVk, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import "./Header.css";
import "./UserMenu.css"; // Ниже стили

function Header() {
    const { getTotalCartItems, isAuthenticated, setIsAuthenticated } = useContext(ShopContext);

    gsap.registerPlugin(ScrollToPlugin);
    const navigate = useNavigate();
    const [menu, setMenu] = useState("shop");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [role, setRole] = useState(localStorage.getItem('role') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [showUserMenu, setShowUserMenu] = useState(false);

    const userMenuRef = useRef();

    useEffect(() => {
        setRole(localStorage.getItem('role') || '');
        setUsername(localStorage.getItem('username') || '');
    }, [isAuthenticated]);

    useEffect(() => {
        const handleClickOutside = event => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };
        if (showUserMenu) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showUserMenu]);

    // авторизация админа на админку, обычного на главную, появление меню, ресета
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

    // header меню юзера
    const UserDropdownMenu = () => (
        <div className="user-menu-dropdown" ref={userMenuRef}>
            <Link to="/profile" onClick={() => setShowUserMenu(false)}>Мои данные</Link>
            <Link to="/profile#orders" onClick={() => setShowUserMenu(false)}>Мои заказы</Link>
            <button className="user-menu-logout" onClick={logout}>Выход</button>
        </div>
    );

    // mobile/desktop адаптация
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    return (
        <header className="header" id="header">
            <div className="container container__main">
                <div className="container__contacts">
                    <li>
                        <Link to="/" className="form__logo">
                            <img src={headerLogo} alt="Логотип сайта" className="logo" />
                        </Link>
                    </li>
                    <div className="contacts__block">
                        <ul className="contacts__icon">
                            <li className="contacts__icon-sochial pulse-one"><a href="https://vk.com/servicebox35" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faVk} /><span>VK</span></a></li>
                            <li className="contacts__icon-sochial pulse-two"><a href="whatsapp://send?phone=79062960353" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /><span>Whatsapp</span></a></li>
                            <li className="contacts__icon-sochial pulse-three"><a href="tg://resolve?domain=@Tomkka" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTelegram} /><span>Telegram</span></a></li>
                        </ul>
                    </div>
                    <div className="content-holder">
                        <span className="heading-span">Часы работы</span><br /><span>Понедельник-Пятница <br />(10:00 - 19:00)</span>
                    </div>
                    <div className="contact-info">
                        <p className="contact-info__location">Адрес: г.Вологда, ул. Северная 7А, 405</p>
                        <p className="contact-info__location">Адрес: г.Вологда, ул. Ленина 6</p>
                    </div>
                    <div className="nav-login-cart">
                        {isAuthenticated ? (
                            <div className="userin-nav">
                                {/* Иконка человека */}
                                <span className="nav-user-icon" onClick={() => setShowUserMenu(!showUserMenu)}>
                                    <FontAwesomeIcon icon={faUser} size="lg" />
                                    {/* для мобильного выводим имя */}
                                    {!isMobile && <span className="nav-username">{username || (role === "admin" ? "Админ" : "Пользователь")}</span>}
                                </span>
                                {!isMobile && showUserMenu && <UserDropdownMenu />}
                                {isMobile && showUserMenu && (
                                    <div className="user-menu-mobilemask">
                                        <UserDropdownMenu />
                                    </div>
                                )}
                                {role === "admin" && (
                                    <Link to="/admin-panel" className="admin-link-btn">Админка</Link>
                                )}
                            </div>
                        ) : (
                            <button onClick={() => setIsLoginOpen(true)}>Вход</button>
                        )}
                        <LoginSignup
                            isOpen={isLoginOpen}
                            onClose={() => setIsLoginOpen(false)}
                            onLoginSuccess={handleLoginSuccess}
                        />
                        <Link to='/cart'>
                            <FontAwesomeIcon icon={faBasketShopping} />
                        </Link>
                        <div className="nav-cart-count">{getTotalCartItems()}</div>
                    </div>
                    <BurgerMenu scrollTo={target => gsap.to(window, { duration: 1, scrollTo: target })} />
                </div>
            </div>
            <div className="header__top">
                <nav className="navigation">
                    <div className="nav__info">
                        <p className="contact-info__number" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faMobilePhone} style={{ marginRight: '3px' }} /> +7 911 501 88 28
                        </p>
                        <p className="contact-info__number" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faMobilePhone} style={{ marginRight: '3px' }} /> +7 911 501 06 96
                        </p>
                    </div>
                    <ul className="navigation__lists">
                        <li className="navigation__list" onClick={() => setMenu("contacts")}>
                            <Link className="navigation__list" to="/contacts">Контакты {menu === "contacts" && <hr />}</Link>
                        </li>
                        <li className="navigation__list" onClick={() => setMenu("about")}>
                            <Link className="navigation__list" to="/about">О нас {menu === "about" && <hr />}</Link>
                        </li>
                        <li className="navigation__list" onClick={() => setMenu("price-list")}>
                            <Link className="navigation__list" to="/prices">Цены {menu === "price-list" && <hr />}</Link>
                        </li>
                        <li className="navigation__list" onClick={() => setMenu("gallery")}>
                            <Link className="navigation__list" to="/image-gallery-api">Фото {menu === "gallery" && <hr />}</Link>
                        </li>
                    </ul>
                    <ul className='nav-menu'>
                        <li className="navigation__list" onClick={() => { setMenu("parts") }}>
                            <Link style={{ textDecoration: 'none' }} to='/parts'>Каталог</Link>
                            {menu === "parts" ? <hr /> : <></>}
                        </li>
                        <li className="navigation__list" onClick={() => { setMenu("newsdetail") }}>
                            <Link style={{ textDecoration: 'none' }} to='/news'>Новости</Link>
                            {menu === "newsdetail" ? <hr /> : <></>}
                        </li>
                        <li className="navigation__list" onClick={() => { setMenu("promotionspage") }}>
                            <Link style={{ textDecoration: 'none' }} to='/promotions-page'>Акции</Link>
                            {menu === "promotionspage" ? <hr /> : <></>}
                        </li>
                        <li className="navigation__list" onClick={() => setMenu("depository")}>
                            <Link to="/depository-public" >
                                Схемы/Bios
                            </Link>
                            {menu === "depository" ? <hr /> : null}
                        </li>
                        <li className="navigation__list" onClick={() => { setMenu("chatwithgpt") }}>
                            <Link to="/chat-with-gpt" >
                                🤖 GPT-Чат
                            </Link>
                            {menu === "chatwithgpt" ? <hr /> : <></>}
                        </li>
                    </ul>
                    <a className="nav-login" href="https://pm-31768.promaster.app/index_cl" target="_blank" rel="noopener noreferrer">
                        <span className="button-text">СТАТУС РЕМОНТА</span>
                    </a>

                </nav>
                <div className="list-header"></div>
            </div>
        </header>
    );
}
export default Header;
