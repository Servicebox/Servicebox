import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBasketShopping, faMobilePhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import headerLogo from "../../images/Servicebox6.svg";
import "./Header.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

import CreateServiceForm from "../AdminPanel/AdminPanelRoute/CreateServiceForm"
import { ShopContext } from '../Contexst/ShopContext';
import { faVk, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import LoginSignup from "../pages/LoginSignup"

import { jwtDecode } from 'jwt-decode'; // Используем именованный импорт
import PromotionsPage from "../AdminPanel/PromotionsPage/PromotionsPage";

function Header() {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems, isAuthenticated, setIsAuthenticated } = useContext(ShopContext);
    gsap.registerPlugin(ScrollToPlugin);
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const navigate = useNavigate();
    const [role, setRole] = useState(localStorage.getItem('role') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    useEffect(() => {
        setUsername(localStorage.getItem('username') || '');
    }, [isAuthenticated]);
    useEffect(() => {
        const checkTokenValidity = () => {
            const token = localStorage.getItem('auth-token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp < currentTime) {
                        localStorage.removeItem('auth-token');
                        localStorage.removeItem('refresh-token');
                        setIsAuthenticated(false);
                    } else {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    localStorage.removeItem('auth-token');
                    localStorage.removeItem('refresh-token');
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        };
        checkTokenValidity();
        const interval = setInterval(checkTokenValidity, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        window.location.href = "tel:+79115018828"; // Исправил неверный формат номера
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setRole('');
        navigate('/');
    }

    useEffect(() => {
        // Когда токен меняется
        setRole(localStorage.getItem('role') || '');
    }, [isAuthenticated]);

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
                            <li className="contacts__icon-sochial pulse-one">
                                <a href="https://vk.com/servicebox35" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faVk} />
                                    <span>VK</span>
                                </a>
                            </li>
                            <li className="contacts__icon-sochial pulse-two">
                                <a href="whatsapp://send?phone=79062960353" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faWhatsapp} />
                                    <span>Whatsapp</span>
                                </a>
                            </li>
                            <li className="contacts__icon-sochial pulse-three">
                                <a href="tg://resolve?domain=@Tomkka" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTelegram} />
                                    <span>Telegram</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="content-holder">
                        <span className="heading-span">Часы работы</span><br />
                        <span>Понедельник-Пятница <br />(10:00 - 19:00)</span>
                    </div>
                    <div className="contact-info">
                        <p className="contact-info__location">Адрес: г.Вологда, ул. Северная 7А, 405</p>
                        <p className="contact-info__location">Адрес: г.Вологда, ул. Ленина 6</p>
                    </div>
                    <div className="nav-login-cart">
                        {isAuthenticated ? (
                            <>
                                <span>{username ? username : (role === "admin" ? "Admin" : "User")}</span>
                                <button onClick={logout}>Выход</button>
                                {role === "admin" && <Link to="/admin-panel">Админка</Link>}
                            </>
                        ) : (
                            <button onClick={openModal}>Вход</button>
                        )}
                        <LoginSignup
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onLoginSuccess={handleLoginSuccess}
                        />
                        <Link to='/cart'>
                            <FontAwesomeIcon icon={faBasketShopping} />
                        </Link>
                        <div className="nav-cart-count">{getTotalCartItems()}</div>
                    </div>
                    <BurgerMenu scrollTo={scrollTo} />
                </div>
            </div>
            <div className="header__top">
                <nav className="navigation">
                    <div className="nav__info">
                        <p className="contact-info__number" onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faMobilePhone} style={{ marginRight: '3px' }} />
                            +7 911 501 88 28
                        </p>
                        <p className="contact-info__number" onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faMobilePhone} style={{ marginRight: '3px' }} />
                            +7 911 501 06 96
                        </p>
                    </div>
                    <ul className="navigation__lists">
                        <li className="navigation__list" onClick={() => setMenu("contacts")}>
                            <Link className="navigation__list" to="/contacts">
                                Контакты {menu === "contacts" && <hr />}
                            </Link>
                        </li>
                        <li className="navigation__list" onClick={() => setMenu("about")}>
                            <Link className="navigation__list" to="/about">
                                О нас {menu === "about" && <hr />}
                            </Link>
                        </li>
                        <li className="navigation__list" onClick={() => setMenu("service")}>
                            <Link className="navigation__list" to="/service">
                                Услуги {menu === "service" && <hr />}
                            </Link>
                        </li>
                        <li className="navigation__list" onClick={() => setMenu("gallery")}>
                            <Link className="navigation__list" to="/image-gallery-api">
                                Фото {menu === "gallery" && <hr />}
                            </Link>
                        </li>
                    </ul>
                    <ul className='nav-menu'>
                        <li className="navigation__list" onClick={() => { setMenu("parts") }}>
                            <Link style={{ textDecoration: 'none' }} to='/parts'>
                                Каталог
                            </Link>
                            {menu === "parts" ? <hr /> : <></>}
                        </li>
                        <li className="navigation__list" onClick={() => { setMenu("newsdetail") }}>
                            <Link style={{ textDecoration: 'none' }} to='/news'>
                                Новости
                            </Link>
                            {menu === "newsdetail" ? <hr /> : <></>}
                        </li>
                        <li className="navigation__list" onClick={() => { setMenu("promotionspage") }}>
                            <Link style={{ textDecoration: 'none' }} to='/promotions-page'>
                                Акции
                            </Link>
                            {menu === "promotionspage" ? <hr /> : <></>}
                        </li>
                    </ul>

                    <a className="button" href="https://pm-31768.promaster.app/index_cl" target="_blank" rel="noopener noreferrer">

                        <span className="button-text">СТАТУС РЕМОНТА</span>
                    </a>
                </nav>
                <div className="list-header">
                </div>
            </div>
        </header>
    );

}

export default Header;