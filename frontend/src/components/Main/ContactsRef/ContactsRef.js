import React, { contactsRef } from "react";
import "./ContactsRef.css";

import VkIcon from "../../../images/vk.svg"
import Telephone from "../../../images/phonecol.svg"
import location from "../../../images/location.svg";
import Mail from "../../../images/mail.svg"
import Watsapp from "../../../images/whatsapp.svg"
import Telegram from "../../../images/telegram.svg"

function ContactsRef({contactsRef}) { 
    return(
      <section id="contactsRef" className="contactsRef" ref={contactsRef}>
        <div className="contacts__list">
        <h4 className="contacts__list-text">Наши контакты</h4>
      </div>
      <div className="contacts__list-info">
        <div className="contacts__block">
          <img src={Telephone} className="contacts__image" alt="Telephone" />
          <p className="contacts__text">+7 911 501 88 28</p>
        </div>
        <div className="contacts__block">
        <img src={Mail } className="contacts__image" alt="Mail" />
          <p className="contacts__text">servicebox35@gmail.com</p>
        </div>
        <div className="contacts__block">
        <img src={location } className="contacts__image" alt="Location" />
          <p className="contacts__text">г. Вологда, ул. Северная, 7А, офис 405</p>
        </div>
       
        <div className="contacts__block-sochial">
          <ul className="contacts__icon">
            <li className="contacts__icon-sochial pulse-one">
            <a href="https://vk.com/servicebox35">
            <img className="contacts__image-sochial" src={VkIcon} alt="Вконтакте" />
            </a>
            </li>
            <li className="contacts__icon-sochial pulse-two">
            <a href="whatsapp://send?phone=79062960353">
            <img className="contacts__image-sochial" src={Watsapp} alt="Вотсапп" />
            </a>
            </li>
            <li className="contacts__icon-sochial pulse-three">
            <a href="tg://resolve?domain=@Tomkka">
            <img className="contacts__image-sochial" src={Telegram} alt="Телеграм" />
            </a>
            </li>
          </ul>
        </div>
        
        </div>
        </section>
    )
}
export default ContactsRef