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

  const endDate = new Date(2023, 11, 31, 23, 59, 59);
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
    <section className="main-banner">
      <video className="vieo-bg" src={Video} autoPlay loop muted/>
      <div className="main-banner__content">
        <div className="main-banner__text">
          <h1 className="main-banner__title">Проблемы с Вашим устройством? </h1>
          <h3 className="main-banner__subtitle">
            Решаем любые проблемы! Большой склад и опытные мастера
          </h3>
          <button className="main-banner__form" onClick={toggleForm}>
            Бесплатная консультация
          </button>
        </div>
      </div>
      {isOpen && <Form toggleForm={toggleForm} />}
      <div className="countdown">
        <h2>Скидка 20% на комплексную чистку ноутбука</h2>
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
      <div className="care">
        <div className="care-about">
          <div className="care-about-you">
            <div className="care-about-you__info">
              <img className="care-about-you__img" src={Eplaceable} alt="" />
              <div className="care-about-you__text">
                <h2 className="care-about-you__title">Подменный телефон</h2>
                <p className="care-about-you___subtitle">
                  Если ремонт займет некоторое время,
                  мы предоставим Вам временный телефон,
                  чтобы Вы могли оставаться на связи со своими близкими,
                  деловыми партнерами и друзьями.
                </p>
              </div>
            </div>
          </div>
          <div className="care-about-you">
            <div className="care-about-you__info">
              <img className="care-about-you__img" src={Cleane} alt="" />
              <div className="care-about-you__text">
                <h2 className="care-about-you__title">Незначительные поломки</h2>
                <p className="care-about-you___subtitle">
                  Не откладывайте ремонт!
                  Обращайтесь к нам и получите качественный бесплатный
                  ремонт незначительных поломок Вашей цифровой техники уже сегодня.
                </p>
              </div>
            </div>
          </div>
          <div className="care-about-you">
            <div className="care-about-you__info">
              <img className="care-about-you__img" src={Diagnostics} alt="диагностка бесплатная" />
              <div className="care-about-you__text">
                <h2 className="care-about-you__title">Бесплатная диагностика</h2>
                <p className="care-about-you___subtitle">
                  Бесплатная диагностика для всех видов цифровой техники!
                  Исключение составляют ноутбуки и ПК.
                  В случае отказа от ремонта, стоимость диагностики составляет
                  всего 500 рублей.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainBanner;