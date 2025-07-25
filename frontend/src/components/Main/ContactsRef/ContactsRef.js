import React, { forwardRef } from 'react'; // Добавляем forwardRef

import "./ContactsRef.css";

import Telephone from "../../../images/phonecol.svg";
import location from "../../../images/location.svg";
import Mail from "../../../images/mail.svg";
import { faMobilePhone, faMailBulk, faMapLocation} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <h2 className="animated-title">Наши контакты</h2>
      </div>
      <div className="contacts__list-info">
        <div onClick={handlePhoneCall} className="contacts__block-ref">
        
    <p className="contact-text" onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
  <FontAwesomeIcon icon={faMobilePhone} style={{ marginRight: '5px' }} />
  +7 911 501 88 28
</p>
        </div>
        <div onClick={handleMailTo} className="contacts__block-ref">
        <p className="contacts__text-ref">
        <FontAwesomeIcon icon={faMailBulk} style={{ marginRight: '5px' }} />
          servicebox35@gmail.com</p>
        </div>
        <div className="contacts__block-ref">
         <p className="contacts__text-ref">
          <FontAwesomeIcon icon={faMapLocation} style={{ marginRight: '5px' }} />
         г. Вологда, ул. Северная, 7А, офис 405</p>
          <div className="contacts__block-ref"></div>
        
        </div>
         <div onClick={handlePhoneCall} className="contacts__block-ref">
        
    <p className="contact-text" onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
  <FontAwesomeIcon icon={faMobilePhone} style={{ marginRight: '5px' }} />
  +7 911 501 88 28
</p>
        </div>
                <div onClick={handleMailTo} className="contacts__block-ref">
        <p className="contacts__text-ref">
        <FontAwesomeIcon icon={faMailBulk} style={{ marginRight: '5px' }} />
          servicebox35@gmail.com</p>
        </div>
                <div className="contacts__block-ref">
         
         <p className="contacts__text-ref">
          <FontAwesomeIcon icon={faMapLocation} style={{ marginRight: '5px' }} />
         г. Вологда, ул. Ленина, 6</p>
        
        </div>
    <div className="contacts__social">
                  <h3 className="contacts__subtitle-ref">Мы в социальных сетях</h3>
                  <div className="social__grid">
                    <a 
                      href="https://vk.com/servicebox35" 
                      className="social__link pulse-one"
                      aria-label="Наша группа ВКонтакте"
                    >
                      <FontAwesomeIcon icon={faVk} />
                      <span>ВКонтакте</span>
                    </a>
                    <a 
                      href="whatsapp://send?phone=79062960353" 
                      className="social__link pulse-two"
                      aria-label="Написать в WhatsApp"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                      <span>WhatsApp</span>
                    </a>
                    <a 
                      href="tg://resolve?domain=@Tomkka" 
                      className="social__link pulse-three"
                      aria-label="Написать в Telegram"
                    >
                      <FontAwesomeIcon icon={faTelegram} />
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
      </div>
    
    </section>
  );
});

export default ContactsRef;