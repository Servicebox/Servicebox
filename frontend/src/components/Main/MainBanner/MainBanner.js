import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./MainBanner.css";

import СloseIcon from "../../../images/x.svg";

import Diagnostics from "../../../images/notorang.svg"
import Cleane from "../../../images/cleane.svg"
import Eplaceable from "../../../images/telpodmena.svg"
import Form from '../../Form/Form';


import Example1 from '../../../images/chistka.webp';
import Example2 from '../../../images/gid.webp';
import Example3 from '../../../images/videocard.webp';
import Example4 from '../../../images/mnogodet.webp';
import Example5 from '../../../images/glass.webp';

function Countdown({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  function formatTime(unit, singular, few, plural) {
    if (unit === 1) return `${unit} ${singular}`;
    else if (unit > 1 && unit < 5) return `${unit} ${few}`;
    else return `${unit} ${plural}`;
  }

  return (
    <div className='countdown_time'>
      <div id="timer">
        <span id="days">{formatTime(timeLeft.days, 'день', 'дня', 'дней')}</span>
        <span id="hours">{formatTime(timeLeft.hours, 'час', 'часа', 'часов')}</span>
        <span id="minutes">{formatTime(timeLeft.minutes, 'минута', 'минуты', 'минут')}</span>
        <span id="seconds">{formatTime(timeLeft.seconds, 'сек', 'сек', 'сек')}</span>
      </div>
    </div>
  );
}

function PromotionCarousel({ toggleForm }) {
  const promotions = [
    {
      title: "Акция! Комплексная чистка ноутбука всего за 900 руб",
      endDate: new Date('2024-11-29T23:59:59'),
      description: "До конца акции осталось:",
      image: Example1
    },
    {
      title: "При установке ориг дисплея, гидрогелевая пленка в подарок",
      endDate: new Date('2024-11-30T23:59:59'),
      description: "До конца акции осталось:",
      image: Example2
    },
    {
      title: "При ремонте видеокарт на Ленина д.6 скидка на работу 20%",
      endDate: new Date('2024-12-30T23:59:59'),
      description: "До конца акции осталось:",
      image: Example3
    },
    {
      title: " Многодетным скидка на работу 20%",
      endDate: new Date('2024-12-30T23:59:59'),
      description: "До конца акции осталось:",
      image: Example4
    },
     {
      title: " Замена стекла в день обращения, со скидкой на работу в 5%",
      endDate: new Date('2024-12-15T23:59:59'),
      description: "До конца акции осталось:",
      image: Example5
    }

  ];

  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);

  function nextPromotion() {
    setCurrentPromotionIndex((currentPromotionIndex + 1) % promotions.length);
  }

  function previousPromotion() {
    const newIndex = currentPromotionIndex - 1;
    setCurrentPromotionIndex(newIndex < 0 ? promotions.length - 1 : newIndex);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPromotionIndex(prevIndex => (prevIndex + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [promotions.length]);

  return (
    <div className="promotion-carousel-container">
      <div 
        className="main-promotion" 
        style={{ backgroundImage: `url(${promotions[currentPromotionIndex].image})` }}
      >
        <div className='content-main'>
          <h2 className='title'>{promotions[currentPromotionIndex].title}</h2>
          <p className='description'>{promotions[currentPromotionIndex].description}</p>
          <Countdown endDate={promotions[currentPromotionIndex].endDate} />
          <button className="main-form" onClick={toggleForm}>
            Записаться
          </button>
        </div>
      </div>

      <div className="side-promotions">
        {promotions.map((promotion, idx) => (
          <div 
            key={idx}
            className={`side-promotion ${idx === currentPromotionIndex ? 'active' : ''}`}
            onClick={() => setCurrentPromotionIndex(idx)}
          >
             
            <div 
              className="side-image"
              style={{
                backgroundImage: `url(${promotion.image})`,
                opacity: idx === currentPromotionIndex ? 1 : 0.5
              }}
            >
        <p className="side-content">{promotion.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button className='btn-main' onClick={previousPromotion}>&#9664;</button>
        <button className='btn-main' onClick={nextPromotion}>&#9654;</button>
      </div>
    </div>
  );
}


function MainBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(true); // Новое состояние для отображения новости

  const toggleForm = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeNews = () => {
    setIsNewsOpen(false);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Animation code
  useEffect(() => {
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const words = "SERVICEBOXSERVICEBOX";
    let ANGLE = 360;
    const ANIMATION_DURATION = 4000;

    const createElements = () => {
      words.split("").forEach((char, i) => {
        const createElement = (offset) => {
          const div = document.createElement("div");
          div.innerText = char;
          div.classList.add("character");
          div.setAttribute("data-offset", offset);
          div.style.animationDelay = `-${i * (ANIMATION_DURATION / 16) - offset}ms`;
          return div;
        };

        document.querySelector("#spiral").append(createElement(0));
        document.querySelector("#spiral2").append(createElement((isFirefox ? 1 : -1) * (ANIMATION_DURATION / 2)));
      });
    };

    createElements();
    if (isFirefox) {
      const animation = () => {
        ANGLE -= 1;
        document.querySelectorAll(".spiral *").forEach((el, i) => {
          const translateY = Math.sin(ANGLE * (Math.PI / 120)) * 100;
          const scale = Math.cos(ANGLE * (Math.PI / 120)) * 0.5 + 0.5;
          const offset = parseInt(el.dataset.offset);
          const delay = i * (ANIMATION_DURATION / 16) - offset;
          setTimeout(() => {
            el.style.transform = `translateY(${translateY}px) scale(${scale})`;
          }, delay);
        });
        requestAnimationFrame(animation);
      };
      animation();
    }
  }, []);

  return (
    <section className="section-plans" id="section-plans">
      <div className="main-form__plans">
        {isOpen && <Form toggleForm={toggleForm} />}
        <PromotionCarousel toggleForm={toggleForm} />
        <div className='btn-form'>
          <button className="main-form" onClick={toggleForm}>
            <span className='title-span'>Записаться</span>
          </button>
        </div>
      </div>

      <div className="mainHeading__content">
        <article className="mainHeading__text">
          <p className="mainHeading__preTitle">всегда на связи с вами</p>
          <h2 className="mainHeading__title">Проблемы с утройством?</h2>
          <p className="mainHeading__description">
            Решаем любые проблемы! Большой склад и опытные мастера
          </p>
          <button className="main-banner__form" onClick={toggleForm}>
            <span className='title-span'>Бесплатная консультация</span>
          </button>
        </article>
        <div className="mainHeading__image">
          <div className="spiral__anim" id="spiral"></div>
          <div className="spiral__anim" id="spiral2"></div>
        </div>
      </div>

     {/*  {isNewsOpen && (
       <div className="news-popup">
          <button onClick={closeNews} className="news-popup__close">&times;</button>
          <h2 className='news__title'>Внимание!</h2>
          <p className='news-subtitle'>Открыли второй отдел по ремонту!!Теперь вы можете посетить нас еще и  по адресу:</p>
          <p className='news-title'>Вологда, ул. Ленина, д. 6 Звоните тел: 500-696</p>
        </div>
      )}
*/}
     <div className="u-center-text u-margin-bottom-big">
        <div className="row">
          <div className="col-1-of-3">
            <div className="card-neon">
              <div className="card__side card__side--front-1">
                <div className="card__titleneon card__titleneon--1">
                  <i className="fas fa-paper-plane"></i>
                  <h4 className="card__heading">Подменный телефон</h4>
                </div>
                <div className="card__details">
                  <img className="care-about__youimg" src={Eplaceable} alt="" />
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-1">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p className="card__price-only">Описание</p>
                    <p className="care-about-you___subtitle">
                      Если ремонт займет некоторое время,
                      мы предоставим Вам временный телефон,
                      чтобы Вы могли оставаться на связи со своими близкими,
                      деловыми партнерами и друзьями.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-1-of-3">
            <div className="card-neon">
              <div className="card__side card__side--front-2">
                <div className="card__titleneon card__titleneon--2">
                  <i className="fas fa-plane"></i>
                  <h4 className="card__heading">Незначительные поломки</h4>
                </div>
                <div className="card__details">
                  <img className="care-about__youimg" src={Cleane} alt="удаление" />
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-2">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p className="card__price-only">Описание</p>
                    <p className="care-about-you___subtitle">
                      Не откладывайте ремонт!
                      Обращайтесь к нам и получите качественный бесплатный
                      ремонт незначительных поломок Вашей цифровой техники уже сегодня.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-1-of-3">
            <div className="card-neon">
              <div className="card__side card__side--front-3">
                <div className="card__titleneon card__titleneon--3">
                  <i className="fas fa-rocket"></i>
                  <h4 className="card__heading">Бесплатная диагностика</h4>
                </div>
                <div className="card__details">
                  <img className="care-about__youimg" src={Diagnostics} alt="диагностка бесплатная" />
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-3">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p className="card__price-only">Описание</p>
                    <p className="care-about-you___subtitle">
                      Не откладывайте ремонт!
                      Обращайтесь к нам и получите качественный бесплатный
                      ремонт незначительных поломок Вашей цифровой техники уже сегодня.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="u-center-text u-margin-top-huge">
        </div>
      </div>
    </section>
  );
}

export default MainBanner;