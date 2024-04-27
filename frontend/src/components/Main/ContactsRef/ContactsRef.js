import React, { forwardRef } from 'react'; // Добавляем forwardRef
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "./ContactsRef.css";

import Telephone from "../../../images/phonecol.svg";
import location from "../../../images/location.svg";
import Mail from "../../../images/mail.svg";

import { faVk, faTelegram, faWhatsapp} from '@fortawesome/free-brands-svg-icons';

const ContactsRef = forwardRef((props, ref) => {
  const handlePhoneCall = () => {
    window.location.href = "tel:+7 911 501 88 28"; 
  };

  const handleMailTo = () => {
    window.location.href = "mailto:servicebox35@gmail.com"; 
  };

  return (
    <section id="contactsRef" className="contactsRef" ref={ref}>
      <div className="contacts__list">
        <h4 className="contacts__list-text">Наши контакты</h4>
      </div>
      <div className="contacts__list-info">
        <div onClick={handlePhoneCall} className="contacts__block">
          <img src={Telephone} className="contacts__image" alt="Telephone" />
          <p className="contacts__text">+7 911 501 88 28</p>
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
    
    </section>
  );
});

export default ContactsRef;