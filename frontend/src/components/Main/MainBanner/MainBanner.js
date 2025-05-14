import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./MainBanner.css";
import SpiralAnimation from './SpiralAnimation';
import СloseIcon from "../../../images/x.svg";

import Diagnostics from "../../../images/notorang.svg"
import Cleane from "../../../images/cleane.svg"
import Eplaceable from "../../../images/telpodmena.svg"
import Form from '../../Form/Form';


import Example1 from '../../../images/1ak.webp';
import Example2 from '../../../images/2ak.webp';
import Example3 from '../../../images/3ak.webp';
import Example4 from '../../../images/4ak.webp';
import Example5 from '../../../images/5ak.webp';
const promoImages = [Example1, Example2, Example3, Example4, Example5];

function PromoImageSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = React.useRef(null);

  const next = () => setCurrent((prev) => (prev + 1) % promoImages.length);
  const prev = () => setCurrent((prev) => (prev - 1 + promoImages.length) % promoImages.length);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleOpenForm = () => {
    setIsFormOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    document.body.style.overflow = "auto";
  };

  const toggleForm = () => setIsFormOpen(v => !v);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (diffX > 40) prev();
    if (diffX < -40) next();
    touchStartX.current = null;
  };

  // Автослайдер
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div
      className="promo-slider"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="promo-slider__arrow left" onClick={prev}>&#8592;</button>
      <div className="promo-slider__viewport">
        <div className="promo-slider__track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {promoImages.map((img, i) => (
            <div className="promo-slider__slide" key={i} style={{ position: "relative" }}>
              <img src={img} alt={`Акция ${i + 1}`} className="promo-slider__img" />
              {i === 4 && (
                <Link to="/chat-with-gpt" className="gpt-banner-btn">
                  🤖 GPT-Чат
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="promo-slider__arrow right" onClick={next}>&#8594;</button>
      <div className="promo-slider__dots">
        {promoImages.map((_, i) =>
          <span key={i} className={i === current ? "active" : ""} onClick={() => setCurrent(i)} />
        )}
      </div>
    </div>
  );
}

const cards = [
  {
    frontTitle: 'Подменный телефон',
    frontIcon: <i className="fas fa-mobile-alt" />,
    img: Eplaceable,
    frontHint: 'подробности на обороте',
    backText: <>
      Если ремонт займет некоторое время,<br />
      мы предоставим вам временный телефон — вы всегда останетесь на связи!
    </>
  },
  {
    frontTitle: 'Незначительные поломки',
    frontIcon: <i className="fas fa-wrench" />,
    img: Cleane,
    frontHint: 'подробности на обороте',
    backText: <>
      Получите бесплатный ремонт<br />
      незначительных поломок цифровой техники.<br />Обращайтесь прямо сегодня!
    </>
  },
  {
    frontTitle: 'Бесплатная диагностика',
    frontIcon: <i className="fas fa-search" />,
    img: Diagnostics,
    frontHint: 'подробности на обороте',
    backText: <>
      Бесплатно диагностируем любые устройства.<br />
      На ноутбуки/ПК/видеокарты — платно только при отказе от ремонта (от 500 ₽).
    </>
  }
];

function FlipCard({ frontTitle, frontIcon, img, frontHint, backText }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`flip-card${flipped ? ' flipped' : ''}`} tabIndex={0}
      onClick={() => setFlipped(f => !f)} onBlur={() => setFlipped(false)}>
      <div className="flip-card__inner">
        <div className="flip-card__front">
          {frontIcon}
          <h4>{frontTitle}</h4>
          <img src={img} alt={frontTitle} />
          <div className="flip-card__hint">{frontHint}</div>
        </div>
        <div className="flip-card__back">
          <div className="flip-card__back-text">
            {backText}
          </div>
          <button className="flip-card__back-btn" type="button"
            onClick={e => { e.stopPropagation(); setFlipped(false); }}>Назад</button>
        </div>
      </div>
    </div>
  );
}

export default function MainBanner() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    document.body.style.overflow = "auto";
  };

  const toggleForm = () => {
    setIsFormOpen(o => !o);
    document.body.style.overflow = isFormOpen ? 'auto' : 'hidden';
  };

  // После отправки (onSent) всегда закрываем форму
  const handleSent = () => {
    setIsFormOpen(false);
    document.body.style.overflow = 'auto';
  };
  const touchStartX = React.useRef(null);
  return (
    <section className="main-banner-section">
      {isFormOpen && <Form onClose={handleCloseForm} />}
      <PromoImageSlider />
      <div className="btn-form">
        <button onClick={handleOpenForm}>Записаться</button>

      </div>
      <div className="main-banner__content">
        <div className="main-banner__text">
          <p className="main-banner__preTitle">всегда на связи с вами</p>
          <h2 className="main-banner__title">Проблемы с устройством?</h2>
          <p className="main-banner__subtitle">
            Решаем любые проблемы! Большой склад и опытные мастера
          </p>
          <button className="main-banner__form" onClick={handleOpenForm}>
            <span className="title-span">Бесплатная консультация</span>
          </button>
        </div>
        <div className="main-banner__image">
          <SpiralAnimation
            text=" SERVICEBOX ЛЕНИНА 6 "
            radius={60}        // радиус круга в px (можешь менять!)
            duration={9000}

          // секунд на полный оборот
          />
        </div>
      </div>
      <div className="flip-card-row">
        {cards.map((card, i) => <FlipCard {...card} key={i} />)}
      </div>
    </section>
  );
}