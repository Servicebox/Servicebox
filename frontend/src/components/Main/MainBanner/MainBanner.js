import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MainBanner.css";
import SpiralAnimation from './SpiralAnimation';
import Form from '../../Form/Form';

// Импорт изображений
import Diagnostics from "../../../images/notorang.svg"
import Cleane from "../../../images/cleane.svg"
import Eplaceable from "../../../images/telpodmena.svg"
import Example1 from '../../../images/1ak.webp';
import Example2 from '../../../images/2ak.webp';
import Example3 from '../../../images/3ak.webp';
import Example4 from '../../../images/4ak.webp';


const promoImages = [Example1, Example2, Example3, Example4];

function PromoImageSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const next = () => setCurrent((prev) => (prev + 1) % promoImages.length);
  const prev = () => setCurrent((prev) => (prev - 1 + promoImages.length) % promoImages.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlay(false);
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
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % promoImages.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <div 
      className="promo-slider"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      itemScope
      itemType="https://schema.org/ImageGallery"
    >
      <div className="seo-content" aria-hidden="true" style={{display: 'none'}}>
        <h1>Акции и специальные предложения ServiceBox</h1>
        <p>Сервисный центр ServiceBox  регулярно проводит акции и предлагает специальные условия 
        на ремонт техники. Узнайте о текущих предложениях на ремонт iPhone, MacBook, ноутбуков и другой техники.</p>
      </div>
      
      <button className="promo-slider__arrow left" onClick={prev} aria-label="Предыдущий слайд">&#8592;</button>
      <div className="promo-slider__viewport">
        <div className="promo-slider__track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {promoImages.map((img, i) => (
            <div className="promo-slider__slide" key={i} itemScope itemType="https://schema.org/ImageObject">
              <img 
              loading="lazy"
                src={img} 
                alt={`Акция на ремонт техники в Вологде ${i + 1}`} 
                className="promo-slider__img"
                itemProp="contentUrl"
              />
              <meta itemProp="name" content={`Акция ServiceBox Вологда ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <button className="promo-slider__arrow right" onClick={next} aria-label="Следующий слайд">&#8594;</button>
      <div className="promo-slider__dots">
        {promoImages.map((_, i) =>
          <button
            key={i}
            className={i === current ? "active" : ""}
            onClick={() => setCurrent(i)}
            aria-label={`Перейти к слайду ${i + 1}`}
          />
        )}
      </div>
    </div>
  );
}

const cards = [
  {
    frontTitle: 'Подменный телефон',
    frontIcon: <i className="fas fa-mobile-alt" aria-hidden="true" />,
    img: Eplaceable,
    frontHint: 'подробности на обороте',
    backText: 'Если ремонт займет некоторое время, мы предоставим вам временный телефон — вы всегда останетесь на связи!',
    schemaType: 'https://schema.org/Service'
  },
  {
    frontTitle: 'Незначительные поломки',
    frontIcon: <i className="fas fa-wrench" aria-hidden="true" />,
    img: Cleane,
    frontHint: 'подробности на обороте',
    backText: 'Получите бесплатный ремонт незначительных поломок цифровой техники. Обращайтесь прямо сегодня!',
    schemaType: 'https://schema.org/Service'
  },
  {
    frontTitle: 'Бесплатная диагностика',
    frontIcon: <i className="fas fa-search" aria-hidden="true" />,
    img: Diagnostics,
    frontHint: 'подробности на обороте',
    backText: 'Бесплатно диагностируем любые устройства. На ноутбуки/ПК/видеокарты — платно только при отказе от ремонта (от 500 ₽).',
    schemaType: 'https://schema.org/Service'
  }
];

function FlipCard({ frontTitle, frontIcon, img, frontHint, backText, schemaType }) {
  const [flipped, setFlipped] = useState(false);
  
  return (
    <div 
      className={`flip-card${flipped ? ' flipped' : ''}`} 
      tabIndex={0}
      onClick={() => setFlipped(f => !f)} 
      onBlur={() => setFlipped(false)}
      itemScope
      itemType={schemaType}
    >
      <div className="flip-card__inner">
        <div className="flip-card__front">
          {frontIcon}
          <h2 itemProp="name">{frontTitle}</h2>
          <img
          
           src={img} alt={frontTitle} itemProp="image" />
          <div className="flip-card__hint">{frontHint}</div>
        </div>
        <div className="flip-card__back">
          <div className="flip-card__back-text" itemProp="description">
            {backText}
          </div>
          <button 
            className="flip-card__back-btn" 
            type="button"
            onClick={e => { e.stopPropagation(); setFlipped(false); }}
            aria-label="Закрыть информацию"
          >
            Назад
          </button>
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

  const handleSent = () => {
    setIsFormOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="main-banner-section" itemScope itemType="https://schema.org/Service">
      <meta itemProp="name" content="ServiceBox - ремонт техники в Вологде" />
      <meta itemProp="description" content="Профессиональный ремонт iPhone, MacBook, ноутбуков и другой техники в Вологде. Бесплатная диагностика, гарантия на работы." />
      <div itemProp="areaServed" itemScope itemType="https://schema.org/City">
        <meta itemProp="name" content="Вологда" />
      </div>
      <div itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
        <meta itemProp="name" content="Услуги сервисного центра ServiceBox" />
        <meta itemProp="description" content="Ремонт Apple техники, замена компонентов, диагностика, восстановление после залития" />
      </div>
      
      {isFormOpen && <Form onClose={handleCloseForm} onSent={handleSent} />}
      
      <PromoImageSlider />
      
      <div className="btn-form">
        <button onClick={handleOpenForm} aria-label="Записаться на ремонт">Записаться</button>
      </div>
      
      <div className="main-banner__content">
        <div className="main-banner__text">
          <p className="main-banner__preTitle">всегда на связи с вами</p>
          <h1 className="main-banner__title">Ремонт цифровой техники в Вологде</h1>
          <p className="main-banner__subtitle">
            Центр ремонта цифровой техники «Servicebox» оказывает услуги по ремонту всех видов цифровой техники в Вологде.
          </p>
          <button className="main-banner__form" onClick={handleOpenForm} aria-label="Получить бесплатную консультацию">
            <span className="title-span">Бесплатная консультация</span>
          </button>
        </div>
        
        <div className="main-banner__image">

        </div>
      </div>
      
      <div className="flip-card-row">
        {cards.map((card, i) => <FlipCard {...card} key={i} />)}
      </div>
      
      <div className="seo-text" aria-hidden="true" style={{display: 'none'}}>
        <h2>ServiceBox</h2>
        <p>Наш сервисный центр специализируется на ремонте цифровой техники: 
        iPhone, iPad, MacBook, ноутбуков, компьютеров и другой электроники. Мы предлагаем качественный 
        ремонт с гарантией, используем оригинальные и качественные совместимые запчасти. 
        Наши сервисные центры расположены по адресам: г. Вологда, ул. Северная 7А, офис 405 и 
        г. Вологда, ул. Ленина 6. Работаем с 10:00 до 18:00 понедельник-пятница.</p>
      </div>
    </section>
  );
}