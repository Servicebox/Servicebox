import React, { forwardRef } from "react";
import "./AboutRef.css";
import {  FaLaptop, FaTabletAlt, FaTv,FaMobile, FaBookReader, FaGamepad, FaDesktop, FaMapMarkerAlt, FaWrench,FaApple, FaRobot,FaRegClock, FaShieldAlt, FaCreditCard } from "react-icons/fa";

const services = [
  { icon: <FaApple />, title: "Ремонт iPhone", text: "Качественная диагностика и недорогой ремонт iPhone." },
  { icon: <FaMobile />, title: "Ремонт смартфонов", text: "Большой опыт в ремонте телефонов от простого до сложного." },
  { icon: <FaGamepad />, title: "Ремонт приставок", text: "Ремонт PlayStation, Xbox и других игровых консолей." },
  { icon: <FaTabletAlt />, title: "Ремонт iPad", text: "Качественный и быстрый ремонт iPad." },
  
  
  { icon: <FaTv />, title: "Ремонт телевизоров", text: "Ремонт ЖК и LED телевизоров любых производителей." },
  
  { icon: <FaLaptop />, title: "Ремонт ноутбуков", text: "Ремонт ноутбуков всех брендов." },
  { icon: <FaTabletAlt />, title: "Ремонт планшетов", text: "Замена дисплеев, ремонт плат, замена компонентов." },
  
  { icon: <FaDesktop />, title: "Ремонт компьютеров", text: "Ремонт и обслуживание стационарных ПК." },
  { icon: <FaWrench />, title: "Обслуживание видеокарт", text: "Ремонт и чистка видеокарт любых моделей." },
  
  { icon: <FaRobot />, title: "Ремонт роботов-пылесосов", text: "Ремонт роботов-пылесосов любых брендов." },
  { icon: <FaMapMarkerAlt />, title: "Ремонт GPS-навигаторов", text: "Отремонтируем любой навигатор в кратчайшие сроки." },
  { icon: <FaBookReader />, title: "Ремонт электронных книг", text: "Ремонт электронных книг любых марок." },
];

const AboutRef = forwardRef((_props, ref) => {
  return (
    <section id="aboutRef" className="aboutRef" ref={ref}>
      <div className="about__content">
      <h2 className="animated-title">О нас</h2>    
        <h3 className="about__text">Быстрый и профессиональный ремонт в Вологде!</h3>
        <h4 className="about__text">
          ServiceBox — это современный сервисный центр, специализирующийся на ремонте цифровой техники. Мы предлагаем
          быструю диагностику и качественный ремонт смартфонов, ноутбуков, планшетов, телевизоров, игровых приставок и
          другой техники.
        </h4>
        <p className="about__subtitle">
          Наша мастерская — это команда опытных специалистов с более чем 10-летним стажем. Мы работаем без задержек,
          предлагаем адекватные цены и официальную гарантию до 12 месяцев.
        </p>
        <p className="about__subtitle">
         Преимущество нашего сервиса заключается в профессионализме мастеров, оперативности и ценовой политике. Опытные сервисные инженера быстро диагностируют проблему и предложат оптимальное решение. Кроме того, использование оригинальных запчастей гарантирует надежную работу вашего устройства.
Еще один плюс — это широкий спектр услуг - выполним ремонт любой цифровой техники!
        </p>

        <h3 className="about__text">Почему выбирают нас?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <FaRegClock className="feature-icon" />
            <h3>Ремонт от 30 минут</h3>
            <p>Срочный ремонт без очередей — большинство работ выполняем при вас</p>
          </div>

          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Гарантия до 12 месяцев</h3>
            <p>Даём официальную гарантию на все виды работ и запчасти</p>
          </div>

          <div className="feature-card">
            <FaCreditCard className="feature-icon" />
            <h3>Любые формы оплаты</h3>
            <p>Наличные, карты, безнал для юрлиц — вам решать как платить</p>
          </div>
        </div>

        <div className="repair-services__about">
   <h2 className="animated-title">Ремонтируем цифровую технику любых видов</h2>   
          <div className="services-about__grid">
            {services.map((service, index) => (
              <div className="service-card__about" key={index}>
                <div className="service-icon">{service.icon}</div>
                <div className="service-info__about">
                <h3 className="service-title__about">{service.title}</h3>
                <p className="service-text__about">{service.text}</p>
              </div>
              </div>
            ))}
            </div>
          
        </div>
      </div>
    </section>
  );
});

export default AboutRef;