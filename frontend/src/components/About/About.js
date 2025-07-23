import React, { useRef, forwardRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";
import "./About.css";
import Clock from "../../images/clock.svg";
import Card from "../../images/Card.svg";
import Secure from "../../images/secure.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Photo0 from "../../images/photo5.webp";
import Photo1 from "../../images/dima.webp";
import Photo2 from "../../images/noutbook.webp";
import Photo3 from "../../images/okul.webp";
import Photo4 from "../../images/photo1.webp";
import Photo5 from "../../images/photo2.webp";
import Photo6 from "../../images/photo3.webp";
import Photo7 from "../../images/PSXvideocard.webp"
import AnimatedTitle from "../AdminPanel/PromotionsPage/AnimatedTitle";


const About = forwardRef((_props, ref) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photos = [Photo0, Photo1, Photo2, Photo3, Photo4, Photo5, Photo6, Photo7];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prevPhoto) => (prevPhoto === photos.length - 1 ? 0 : prevPhoto + 1));
    }, 8080);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentPhoto((prevPhoto) => (prevPhoto === photos.length - 1 ? 0 : prevPhoto + 1));
  };

  const handlePrev = () => {
    setCurrentPhoto((prevPhoto) => (prevPhoto === 0 ? photos.length - 1 : prevPhoto - 1));
  };
  return (
    <section id="aboutRef" className="aboutRef" ref={ref}>
      <div className="about__content">
        <h2 className="animated-title">О компании ServiceBox</h2>
        <h3 className="about__text">
          Быстрый и профессиональный ремонт в Вологде!</h3>
        <h4 className="about__text">
          ServiceBox открывает двери новой мастерской, расширяя спектр услуг! Теперь мы предлагаем быстрый и профессиональный ремонт видеокарт, ноутбуков, материнских плат, ПК, игровых консолей Sony, X-box, техники Apple, телефонов, планшетов, телевизоров.</h4>

        <p className="about__subtitle"> Сервисный центр "ServiceBox" выполняет разный спектр услуг по ремонту и обслуживанию видеокарт и ноутбуков. Как самые простые работы по замене bga (это замена видеочипов, хабов-чипсетов, видеопамяти, процессоров), так и сложные: устранение прогаров, плавающих дефектов, залития, ремонт ударников (ноутбуков и видеокарт после механического воздействия или удара).
          Наша главная цель - обеспечить удобство для наших клиентов.
        </p>
        <p className="about__subtitle">
          Мы также понимаем важность разумного подхода к ценообразованию.
          В "ServiceBox" мы выбираем взвешенную ценовую политику,
          чтобы цены на ремонт телефонов, планшетов и ноутбуков
          были адекватны стоимости самих гаджетов.
          Вы можете быть уверены, что не будет никаких скрытых комиссий или
          неожиданных повышений стоимости работ после установления причины поломки.</p>

        <h3 className="about__text">Почему стоит выбрать нашу мастерскую по ремонту цифровой техники?</h3>
        <p className="about__subtitle">
          В "ServiceBox" мы гордимся тем, что беремся даже за самые безнадежные случаи.
          Наша команда квалифицированных мастеров имеет более 10-летний опыт в ремонте мобильных телефонов,
          планшетов и ноутбуков в Вологде.
          Вы можете связаться с нами через наш сайт и получить консультацию
          в режиме онлайн.
          Доверьте свои гаджеты "ServiceBox" - Ваша техника будет в надежных руках.
        </p>
        <h3 className="about__text">    <span className="about-me__quote">Если у вас есть замечания или пожелания по работе сервиса, или идеи, которыми вы хотите поделиться, можете написать в   <a href="tg://resolve?domain=@Tomkka">
          <FontAwesomeIcon icon={faTelegram} />
          <span> - Telegram</span>
        </a>.
          Мы всегда обращаем внимание на комментарии наших клиентов и подписчиков и стараемся улучшать работу сервиса.
        </span>
        </h3>
        <div>
          <h2 className="about-me__title">


          </h2>
          <div className="about-me__about">
            <div className="about-me">
              <img src={photos[currentPhoto]} className="about-me__image" alt="фотография" />
              <div className="about-me__gallery-controls">
              </div>
              <div className="about-me__dots">
                {photos.map((_, index) => (
                  <span
                    key={index}
                    className={`about-me__dot ${currentPhoto === index ? "active" : ""}`}
                    onClick={() => setCurrentPhoto(index)}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
        <div className="features-grid">
                    <div className="feature-card">
                        <img src={Clock} className="feature-icon pulse" alt="Быстрый ремонт" />
                        <h3>Ремонт от 30 минут</h3>
                        <p>Срочный ремонт без очередей - большинство работ выполняем при вас</p>
                    </div>
                    
                    <div className="feature-card">
                        <img src={Secure} className="feature-icon" alt="Гарантия качества" />
                        <h3>Гарантия до 12 месяцев</h3>
                        <p>Даём официальную гарантию на все виды работ и запчасти</p>
                    </div>
                    
                    <div className="feature-card">
                        <img src={Card} className="feature-icon" alt="Удобная оплата" />
                        <h3>Любые формы оплаты</h3>
                        <p>Наличные, карты, безнал для юрлиц - вам решать как платить</p>
                    </div>
                </div>

      </div>
      <div className="back__btn">
        <ul>
          <li><Link to="/">На главную</Link>
          </li>
        </ul>
      </div>
    </section>
  );
});

export default About;