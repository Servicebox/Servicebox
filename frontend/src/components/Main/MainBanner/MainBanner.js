import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./MainBanner.css";

import СloseIcon from "../../../images/x.svg";

import Diagnostics from "../../../images/notorang.svg"
import Cleane from "../../../images/cleane.svg"
import Eplaceable from "../../../images/telpodmena.svg"
import Form from '../../Form/Form';




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
      <span id="seconds">{formatTime(timeLeft.seconds, 'секунда', 'секунды', 'секунд')}</span>
      </div>
      </div>
    );
  }
  function PromotionCarousel() {
    const promotions = [
      {
        title: "Акция! Комплексная чистка ноутбука всего за 900 руб",
        endDate: new Date('2024-05-31T23:59:59'),
        description: "До конца акции осталось:"
      },
      {
        title: "Акция! При установке оригинального дисплейного модуля, гидрогелевая пленка в подарок,",
        endDate: new Date('2024-06-30T23:59:59'),
        description: "До конца акции осталось:"
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
      }, 4000); // Change promotion every 3 seconds
      return () => clearInterval(intervalId);
    }, [promotions.length]);
    
    return (
      <div className="promotion-carousel">
        <button className='btn-main' onClick={previousPromotion}>&#9664;</button>
        <div>
          <h2 className='promotion-title'>{promotions[currentPromotionIndex].title}</h2>
          <p>{promotions[currentPromotionIndex].description}</p>
          <Countdown endDate={promotions[currentPromotionIndex].endDate} />
        </div>
        <button className='btn-main' onClick={nextPromotion}>&#9654;</button>

        <div className='btn-form'>
          <button className="main-form" onClick={() => alert('Booking form opens!')}>
            Записаться
          </button>
        </div>
        <div className='dots'>
  {promotions.map((_, idx) => (
    <span key={idx}
          className={`dot ${idx === currentPromotionIndex ? 'active' : ''}`}
          onClick={() => setCurrentPromotionIndex(idx)} />
  ))}
</div>
      </div>
      
    );
    
  }

  function MainBanner() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleForm = () => {
      setIsOpen(!isOpen);
      document.body.style.overflow = isOpen ? 'auto' : 'hidden';
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
  
    return (
      <section className="section-plans" id="section-plans">
        <div className="main-form__plans">
        
        {isOpen && <Form toggleForm={toggleForm} />}
        <PromotionCarousel />
        <div className='btn-form'>
        <button className="main-form" onClick={toggleForm}>
          <span className='title-span'>записаться</span> 
          </button>
          </div>
     </div>
    
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
              <img className="care-about-you__img" src={Eplaceable} alt="" />
           
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
              <img className="care-about-you__img" src={Cleane} alt="" />
             
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
              <img className="care-about-you__img" src={Diagnostics} alt="диагностка бесплатная" />
             
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