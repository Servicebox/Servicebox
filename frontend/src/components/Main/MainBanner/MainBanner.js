import React, { useState, useEffect } from 'react';
import "./MainBanner.css";

import СloseIcon from "../../../images/x.svg";
import Video from '../../../images/video.mp4';
import Diagnostics from "../../../images/notorang.svg"
import Cleane from "../../../images/cleane.svg"
import Eplaceable from "../../../images/telpodmena.svg"
import Form from '../../Form/Form';


function MainBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);

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

  const endDate = new Date(2024, 3, 31, 23, 59, 59);
  function updateCountdown() {
    const currentDate = new Date();
    const remainingTime = endDate - currentDate;

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;

    setSeconds(seconds);
  }

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-plans" id="section-plans">
   
      <div className="main-banner__content">
        <div className="main-banner__text">
          <h1 className="main-banner__title">Проблемы с Вашим устройством? </h1>
          <h3 className="main-banner__subtitle">
            Решаем любые проблемы! Большой склад и опытные мастера
          </h3>
          <button className="main-banner__form" onClick={toggleForm}>
          <span className='title-span'>Бесплатная консультация</span> 
          </button>
        </div>
      </div>
      {isOpen && <Form toggleForm={toggleForm} />}
      <div className="countdown">
      <h2> Акция! Комплексная чистка ноутбука всего за 900 руб</h2>
        <p>До конца акции осталось:</p>
        <div className='countdown_time'>
          <div id="timer">
            <span id="days"></span>
            <span id="hours"></span>
            <span id="minutes"></span>
            <span id="seconds"></span>
          </div>
        </div>
        <div className='countingdown'>
          <p>дней</p>
          <p>часов</p>
          <p>минут</p>
          <p>сек</p>
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