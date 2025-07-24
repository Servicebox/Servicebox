import React, { forwardRef } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapLocation, 
  faMobilePhone, 
  faMailBulk,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { 
  faVk, 
  faTelegram, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';

import "./Contacts.css";

const Contacts = forwardRef((props, ref) => {
  const handlePhoneCall = () => {
    window.location.href = "tel:+79115018828";
  };

  const handleMailTo = () => {
    window.location.href = "mailto:servicebox35@gmail.com";
  };

  const openMap = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://yandex.ru/maps/?text=${encodedAddress}`, '_blank');
  };

  return (
    <section id="contacts" className="contacts" ref={ref}>
      <div className="contacts__container">
        <div className="contacts__header">
          <h2 className="animated-title">Контактная информация</h2>
          <p className="contacts__intro">
            Ищете профессиональный ремонт ноутбуков, видеокарт, материнских плат, смартфонов и планшетов в Вологде? 
            Сервисный центр ServiceBox предлагает комплексные решения для вашей электроники. 
            Наши квалифицированные специалисты с многолетним опытом оперативно диагностируют 
            и устранят любые неисправности, используя оригинальные комплектующие и современное оборудование.
          </p>
        </div>

        <div className="contacts__grid">
          <div className="contacts__info">
            <h2 className="contacts__subtitle">Как с нами связаться</h2>
            
            <div className="contacts__block" onClick={handlePhoneCall}>
              <div className="contacts__icon-wrapper">
                <FontAwesomeIcon icon={faMobilePhone} className="contacts__icon" />
              </div>
              <div className='contacts__text-wrapper'>
                <h3 className="contacts__block-title">Телефон</h3>
                <p className="contacts__text contacts__link">+7 (911) 501-88-28</p>
                <p className="contacts__note">Звонки принимаем ежедневно с 9:00 до 20:00</p>
              </div>
            </div>

            <div className="contacts__block" onClick={handleMailTo}>
              <div className="contacts__icon-wrapper">
                <FontAwesomeIcon icon={faMailBulk} className="contacts__icon" />
              </div>
              <div className='contacts__text-wrapper'>
                <h3 className="contacts__block-title">Электронная почта</h3>
                <p className="contacts__text contacts__link">servicebox35@gmail.com</p>
                <p className="contacts__note">Отвечаем в течение 1 рабочего дня</p>
              </div>
            </div>

            <div className="contacts__block">
              <div className="contacts__icon-wrapper">
                <FontAwesomeIcon icon={faClock} className="contacts__icon" />
              </div>
              <div className='contacts__text-wrapper'>
                <h3 className="contacts__block-title">Режим работы</h3>
                <p className="contacts__text">Пн-Пт: 10:00 - 19:00</p>
                <p className="contacts__text">Сб-Вс: Выходные дни</p>
              </div>
            </div>

            <div className="contacts__social">
              <h3 className="contacts__subtitle">Мы в социальных сетях</h3>
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

          <div className="contacts__locations">
            <h2 className="contacts__subtitle">Наши сервисные центры в Вологде</h2>
            
            <div className="location__card" onClick={() => openMap("г. Вологда, ул. Северная, 7А, офис 405")}>
              <div className="location__header">
                <FontAwesomeIcon icon={faMapLocation} className="location__icon" />
                <h3 className="location__title">Центральный сервис</h3>
              </div>
              <p className="location__address">
                г. Вологда, ул. Северная, 7А, офис 405
              </p>
              <p className="location__description">
                Наш главный сервисный центр с полным циклом ремонтных работ. 
                Здесь проводится сложный ремонт материнских плат, замена чипов, 
                восстановление после залития жидкостью.
              </p>
              <button className="location__map-btn">
                Открыть на карте
              </button>
            </div>
            
            <div className="location__card" onClick={() => openMap("г. Вологда, ул. Ленина, 6")}>
              <div className="location__header">
                <FontAwesomeIcon icon={faMapLocation} className="location__icon" />
                <h3 className="location__title">Сервис в центре города</h3>
              </div>
              <p className="location__address">
                г. Вологда, ул. Ленина, 6
              </p>
              <p className="location__description">
                Удобно расположенный сервис для быстрого ремонта: замена экранов, 
                батарей, разъемов зарядки. Работаем без предварительной записи 
                в удобное для вас время.
              </p>
              <button className="location__map-btn">
                Открыть на карте
              </button>
            </div>
          </div>
        </div>

        <div className="contacts__seo">
          <h2 className="contacts__subtitle">Профессиональный ремонт техники в Вологде</h2>
          <p className="location__description">
            ServiceBox - это современный сервисный центр в Вологде, специализирующийся 
            на ремонте ноутбуков, смартфонов, планшетов и другой электроники. 
          </p>
          
          <p className="contacts__subtitle">Наши преимущества:</p>
          <ul className="contacts__benefits">
            <li>
              Бесплатная диагностика всех устройств при согласии на ремонт
              <span className="paid">***</span>
            </li>
            <li>Гарантия от 1 месяца до 6 месяцев на все виды работ</li>
            <li>Использование оригинальных запчастей и качественных аналогов</li>
            <li>Срочный ремонт за 30-60 минут</li>
            <li>Опытные инженеры с сертификатами производителей</li>
            <li>Прозрачное ценообразование с фиксированной стоимостью</li>
          </ul>

          <p className="location__description">
            <span className="paid">***</span>
            <strong>Важно: при отказе от ремонта взимается плата за диагностику.</strong> В сложных случаях, когда диагностика требует 
            значительного времени (замена компонентов для тестирования, поиск 
            микротрещин на плате), при отказе от ремонта взимается плата за 
            диагностические работы от 500 до 1500 рублей
            <span className="lowercase">(зависит от сложности)</span>.
          </p>
        </div>

        <div className="contacts__navigation">
          <Link to="/prices" className="nav__link">Наши услуги</Link>
          <Link to="/" className="nav__link">На главную</Link>
         
        </div>
      </div>
    </section>
  );
});

export default Contacts;