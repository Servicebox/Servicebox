import React, { useRef , forwardRef} from "react";
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";
import "./ServiceRef.css";

import Rectangle from "../../../images/Rectangle.png";

import Applefon from "../../../images/apple.png";
import Android from "../../../images/android.png";
import Tablet from "../../../images/tablet.png";
import Notebook from "../../../images/notebook.png"
import Monoblok from "../../../images/monoblok.png"
import Devices from "../../../images/Devices.png"

import Arrow from "../../../images/Up.svg";

import Tv from "../../../images/tv.png"
import Glass from "../../../images/Glass.png"


const Card = ({ title, image, subtitle, serviceRef,button }) => {
  return (
    <section className="serviceRef" ref={serviceRef}>
      <div className="card">
        <img src={Rectangle} className="rectangle" alt="Rectangle" />

        {image === "Notebook" && (
          <Link to="/notebook-service">
          <img src={Notebook} className="card__image" alt="Clock" />
          <h3 className="card__subtitle">посмотреть прайс</h3>
          </Link>
        )}
        {image === "Monoblok" && (
          <Link to="/monoblock-service">
          <img src={Monoblok} className="card__image" alt="Clock" />
          <h3 className="card__subtitle">посмотреть прайс</h3>
          </Link>
        )}

        {image === "Applefon" && (
          <Link to="/appl-service">
          <img src={Applefon} className="card__image" alt="Applefon" />
          <h3 className="card__subtitle">посмотреть прайс</h3>
          </Link>
        )}

        {image === "Android" && (
           <Link to="/telephone-service">
          <img src={Android} className="card__image" alt="Android" />
          <h3 className="card__subtitle">посмотреть прайс</h3>
          </Link>
        )}
        {image === "Tablet" && (
          <Link to="/tablet-service">
          <img src={Tablet} className="card__image" alt="Clock" />
          <h3 className="card__subtitle">посмотреть прайс</h3>
          </Link>
        )}

        {image === "Tv" && (
          <Link to="/tv-service">
          <img src={Tv} className="card__image" alt="Tv" />
          <h3 className="card__subtitle">посмотреть прайс</h3>
          </Link>
        )}

{image === "Glass" && (
          <Link to="/glass-replacement-price-lists">
            <img src={Glass} className="card__image" alt="Glass" />
            <h3 className="card__subtitle">посмотреть прайс</h3>
          </Link>
        )}
        

        {image === "Devices" && (
            <Link to="/other-service">
          <img src={Devices} className="card__image" alt="Devices" />
          <h3 className="card__subtitle">посмотреть прайс</h3>
          </Link>
        )}

        <h3 className="card__title">{title}</h3>
      
        <div className="ellipsis">{subtitle}</div>
        
        <div className="card__button">
          <img src={Arrow} className="arrow-one" alt="Arrow" />
        </div>
      </div>
    </section>
  );
};


  const cardsData = [
    {
      title: "Ноутбуками",
      subtitle: "Ремонт ноутбуков любой сложности.Замнимаемься заменой мультиконтроллеров, USB портов, кулеров, северных мостов и разъемов зарядки,замена матрицы.",
      image: "Notebook",
    },

    {
      title: "компьютерами и моноблоками",
      subtitle: "Ремонт компьютером любой сложности,настройка и сборка.",
      image: "Monoblok",
    },

    {
      title: "Apple техникой",
      subtitle: "Качественный ремонт Apple техники любой сложности,заменна аккумулятора без ошибок, дисплейного модуля,так же меняем стекла.",
      image: "Applefon",
    },
    {
      title: "телефонами всех марок",
      subtitle: "Надежный ремонт телефонов любой модели. Быстро и качественно. От замены дисплейного модуля до компонетного ремонта системнной платы",
      image: "Android",
    },
    {
      title: "Планшетами",
      subtitle: "Быстрый и надежный ремонт планшетов любых марок и моделей.",
      image: "Tablet",
    },

    {
      title: "Телевизорами и мониторами",
      subtitle: "Профессиональный ремонт телевизоров: замена подсветки, уменьшение тока подсветки, ремонт системной платы, и многое другое",
      image: "Tv",
    },

    {
      title: "Замена стекла",
      subtitle: "Замена стекла от 1 часа, на любом телефоне и планшете, часах. Если у вас есть изображение и нет фантмных нажатии- то можно просто поменять стекло",
      image: "Glass",
      linkTo: "/glass-replacement-details",
    
    },

    {
      title: "Другими устройствами",
      subtitle: " Ремонт различных устройств, включая Bluetooth-колонки, роботы-пылесосы, электронные книги, игровые приставки и видеорегистраторы. Наша команда опытных специалистов готова помочь! Мы осуществляем замену комплектующих, восстановление функциональности, диагностику и ремонт системных плат.",
      image: "Devices",
    },
  ];

  const ServiceRef = forwardRef((_props, ref) => {


    return (
      <section id="serviceRef" className="serviceRef" ref={ref}>
        <div className="service__content">
    
          <h2 className="service__title">Мы работаем с устройствами:</h2>
          <p className="service__subtitle">
            Команда опытных специалистов обладает глубокими знаниями в области
            ремонта цифровой техники и готова решить любые проблемы, с которыми Вы
            столкнулись. Мы используем современное оборудование и проверенные
            методы, чтобы обеспечить высокое качество услуг.
          </p>
          <p className="service__subtitle-one">
  <span className="priceInDevelopment">*прайс по услугам в разработке</span>
</p> 
          <div className="tech">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                image={card.image}
                 linkTo={card.linkTo}
              />
            ))}
          </div>
          
        </div>
      </section>
    );
  });
  
  export default ServiceRef;