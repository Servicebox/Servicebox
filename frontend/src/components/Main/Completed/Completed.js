import React, { useState, useEffect } from "react";
import "./Completed.css";
import PrevButton from "../../../images/Down.svg"
import NextButton from "../../../images/Up.svg"
import One from "../../../images/1.jpeg";
import Two from "../../../images/2.jpeg";
import Three from "../../../images/3.jpeg";
import Four from "../../../images/4.jpeg";
import Five from "../../../images/5.jpeg";
import Six from "../../../images/7.jpeg";
import Seven from "../../../images/8.jpeg";
import Eight from "../../../images/9.jpeg";
import Nine from "../../../images/photo1.jpeg";
import Ten from "../../../images/11.jpeg";
import Eleven from "../../../images/12.jpeg";
import Twelve from "../../../images/13.jpeg";
import Thirteen from "../../../images/14.jpeg";
import Foourteen from "../../../images/15.jpeg";

function Completed() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const photos = [
    { image: One, text: "Замена аккумулятора на роботе-пылесосе" },
    { image: Two, text: "Замена материнской платы на Ipad" },
    { image: Three, text: "Замена HDMI порта" },
    { image: Four, text: "Комплексная чистка и замена аккумулятора на macbook" },
    { image: Five, text: "Комплексная чистка macbook pro" },
    { image: Six, text: "Замена аккумулятора на телефоне" },
    { image: Seven, text: "Замена сокета на материнской плате" },
    { image: Eight, text: "Восстановление подсветки дисплея и заменна динамика на видеорегистраторе" },
    { image: Nine, text: "Ребол процессора на материннской плате" },
    { image: Ten, text: "замена дисплейного модуля и задней крышки" },
    { image: Eleven, text: "Комплексная чистка, замена куллера и установка драйверов на ноутбук" },
    { image: Twelve, text: "Замена хаба на на материнской плате" },
    { image: Thirteen, text: "Замена дисплейного модуля на Iphone" },
    { image: Foourteen, text: "Комлексное обслуживание Macbook pro и замена touch bar" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentPhoto((prevPhoto) => (prevPhoto === photos.length - 1 ? 0 : prevPhoto + 1));
  };

  const handlePrev = () => {
    setCurrentPhoto((prevPhoto) => (prevPhoto === 0 ? photos.length - 1 : prevPhoto - 1));
  };

  return (
    <section className="completed">
      <div className="completed__content">
        <h2 className="completed__title">Выполненные заказы</h2>
      </div>
      {windowWidth >= 320 && windowWidth <= 768 ? (
        <div className="completed__carousel">
          <img src={photos[currentPhoto].image} alt="фотография" className="completed__carousel-img" />
          <div className="completed__carousel-overlay">
            <span className="completed__carousel-text">{photos[currentPhoto].text}</span>
          </div>
          <div className="completed__carousel-controls">
            <button className="completed__carousel-btn" onClick={handlePrev}>
            <img className="completted__prev-image" src={PrevButton} alt="назад" />
            </button>
            <button className="completed__carousel-btn" onClick={handleNext}>

            <img className="completted__next-image" src={NextButton} alt="вперед" />
            </button>
          </div>
        </div>
      ) : (
        <div className="completed__image">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`completed__img-container ${currentPhoto === index ? "active" : ""}`}
              onMouseEnter={() => setCurrentPhoto(index)}
              onMouseLeave={() => setCurrentPhoto(null)}
            >
              <img src={photo.image} alt="фотография" className="completed__img" />
              <div className="completed__img-overlay">
                <span className="completed__img-text">{photo.text}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Completed;