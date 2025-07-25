import React, { useRef, forwardRef } from "react";
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";
import "./Service.css";
import Card from "../Main/MainBanner/Card";




const cardsData = [
  {
    title: "Ноутбуками",
    subtitle: "Ремонт ноутбуков любой сложности.Замнимаемься заменой мультиконтроллеров, USB портов, кулеров, северных мостов и разъемов зарядки,замена матрицы.",
    image: "Notebook",
    linkTo: "/notebook-service",
  },

  {
    title: "компьютерами и моноблоками",
    subtitle: "Ремонт компьютером любой сложности,настройка и сборка.",
    image: "Monoblok",
    linkTo: "/monoblock-service",
  },

  {
    title: "Apple техникой",
    subtitle: "Качественный ремонт Apple техники любой сложности,заменна аккумулятора без ошибок, дисплейного модуля,так же меняем стекла.",
    image: "Applefon",
    linkTo: "/appl-service",
  },
  {
    title: "телефонами всех марок",
    subtitle: "Надежный ремонт телефонов любой модели. Быстро и качественно. От замены дисплейного модуля до компонетного ремонта системнной платы",
    image: "Android",
    linkTo: "/telephone-service",
  },
  {
    title: "Планшетами",
    subtitle: "Быстрый и надежный ремонт планшетов любых марок и моделей.",
    image: "Tablet",
    linkTo: "/tablet-service",
  },

  {
    title: "Телевизорами и мониторами",
    subtitle: "Профессиональный ремонт телевизоров: замена подсветки, уменьшение тока подсветки, ремонт системной платы, и многое другое",
    image: "Tv",
    linkTo: "/tv-service",
  },

  {
    title: "Замена стекла",
    subtitle: "Замена стекла от 1 часа, на любом телефоне и планшете, часах. Если у вас есть изображение и нет фантмных нажатии- то можно просто поменять стекло",
    image: "Glass",
    linkTo: "/glass-replacement-price-lists",

  },
  {
    title: "Видеокартами",
    subtitle: " Ремонт и обслуживание видеокарт",
    image: "Videocard",
    linkTo: "/videocard"
  },

  {
    title: "Другими устройствами",
    subtitle: " Ремонт различных устройств, включая Bluetooth-колонки, роботы-пылесосы, электронные книги, игровые приставки и видеорегистраторы.",
    image: "Devices",
    linkTo: "/other-service"
  },
];

const Service = forwardRef((_props, ref) => {
  return (
    <section id="service" className="service">
      <div className="service-content">
        <h2 className="animated-title open">Мы работаем с устройствами:</h2>
        <div className="tech">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}

              image={card.image}
              linkTo={card.linkTo}
              subtitle={card.subtitle}
            />
          ))}
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

export default Service;