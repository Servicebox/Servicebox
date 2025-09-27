import React, { useState, useEffect, useRef } from "react";
import "./AboutMe.css";

function AboutMe() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [transition, setTransition] = useState(true);
  const sectionRef = useRef(null);

  const quotes = [
    "В нашей компании работают лучшие специалисты, которые прекрасно разбираются в современных технологиях и имеют более 10 лет опыта работы.",
    "Каждый ремонт — это вызов, который мы принимаем с энтузиазмом и профессионализмом.",
    "Мы используем только оригинальные запчасти и современное диагностическое оборудование.",
    "Ваше устройство в надежных руках — мы относимся к каждой технике, как к своей собственной."
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setTransition(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setTransition(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section 
      className="about-me" 
      id="about-company"
      ref={sectionRef}
      itemScope 
      itemType="https://schema.org/AboutPage"
      aria-labelledby="about-heading"
    >
      <meta itemProp="name" content="О компании ServiceBox" />
      <meta itemProp="description" content="Профессиональный ремонт техники в Вологде с гарантией качества. Опытные специалисты, оригинальные запчасти, современное оборудование." />
      
      <div className="about-me__content">
        <div className="quote-container" itemScope itemType="https://schema.org/Quotation">
          <h2 id="about-heading" className="about-me__title">
            <span 
              className={`about-me__quote ${transition ? 'fade-in' : 'fade-out'}`}
              itemProp="text"
            >
              {quotes[currentQuote]}
            </span>
          </h2>
          <div className="quote-decoration" aria-hidden="true"></div>
          <div className="seo-content" aria-hidden="true" style={{display: 'none'}}>
            <h3>профессиональный ремонт техники</h3>
            <p>Наша компания ServiceBox уже более 10 лет предоставляет качественные услуги по ремонту электронной техники в городе Вологда. Мы специализируемся на ремонте smartphones, ноутбуков, планшетов и другой цифровой техники.</p>
            <p>Наши мастера имеют сертификаты и регулярно проходят обучение новым технологиям ремонта. Мы используем только оригинальные запчасти и современное диагностическое оборудование.</p>
            <p>Наш сервисный центр находится по адресу: г. Вологда, ул. Северная 7А, 405. Также мы работаем по второму адресу: г. Вологда, ул. Ленина 6.</p>
            <p>График работы: Понедельник-Пятница с 10:00 до 19:00. Контактные телефоны: +7 911 501 88 28, +7 911 501 06 96.</p>
          </div>
        </div>
        <div className="quote-navigation">
          {quotes.map((_, index) => (
            <button
              key={index}
              className={`quote-dot ${currentQuote === index ? 'active' : ''}`}
              onClick={() => {
                setTransition(false);
                setTimeout(() => {
                  setCurrentQuote(index);
                  setTransition(true);
                }, 500);
              }}
              aria-label={`Показать цитату ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutMe;