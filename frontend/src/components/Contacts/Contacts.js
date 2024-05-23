import React, { forwardRef } from 'react'; // Добавляем forwardRef
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "./Contacts.css";

import Telephone from "../../images/phonecol.svg";
import location from "../../images/location.svg";
import Mail from "../../images/mail.svg";
import Footer from '../Footer/Footer';

import {  faMobilePhone} from '@fortawesome/free-solid-svg-icons';
import { faVk, faTelegram, faWhatsapp} from '@fortawesome/free-brands-svg-icons';

const Contacts = forwardRef((props, ref) => {
  const handlePhoneCall = () => {
    window.location.href = "tel:+7 911 501 88 28"; 
  };

  const handleMailTo = () => {
    window.location.href = "mailto:servicebox35@gmail.com"; 
  };

  return (
    <section id="contacts" className="contacts">
        <div className="footer__links">
      <div className="contacts__list">
        <h4 className="contacts__list-text">Наши контакты</h4>
        <p className='contacts-text' >Здесь вы найдете всю необходимую информацию для связи с нами по вопросам ремонта ноутбуков, телефонов и планшетов. Мы предлагаем профессиональные услуги по ремонту электроники, быстро и качественно восстановим ваше устройство.

Вы можете связаться с нами по указанному номеру телефона или отправить запрос по электронной почте. Наши специалисты ответят на все ваши вопросы и помогут найти оптимальное решение для восстановления вашего гаджета.

Кроме того, вы можете посетить наш сервисный центр лично, наш адрес указан на сайте. Мы всегда готовы принять ваше устройство для диагностики и ремонта. Наши высококвалифицированные техники обладают богатым опытом работы с различными видами устройств, и готовы устранить любые неисправности.

Свяжитесь с нами уже сегодня, и мы с удовольствием поможем вам вернуть вашу технику в рабочее состояние. Надежный и качественный ремонт гаджетов – это наша специализация!</p>
      </div>
      <div className="contacts__list-info">
        <div onClick={handlePhoneCall} className="contacts__block">
        <p className="contact-info__number" onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
  <FontAwesomeIcon icon={faMobilePhone} style={{ marginRight: '3px' }} />
  +7 911 501 88 28
</p>
        </div>
        <div onClick={handleMailTo} className="contacts__block">
          <img src={Mail} className="contacts__image" alt="Mail" />
          <p className="contacts__text">servicebox35@gmail.com</p>
        </div>
        <div className="contacts__block">
          <img src={location} className="contacts__image" alt="Location" />
          <p className="contacts__text">г. Вологда, ул. Северная, 7А, офис 405</p>
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
      </div>
 <div className="footer__contacts">
 < Footer/> 
 </div>
 <div className="back__btn"> 
      <ul>
      <li><Link to="/">На главную</Link>
      </li>
      </ul>
      </div>
 </div>
    </section>
    );
   
  
 
});

export default Contacts;