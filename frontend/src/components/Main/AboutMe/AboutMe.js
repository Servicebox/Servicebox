import React, { useState, useEffect } from "react";
import "./AboutMe.css";
import Photo0 from "../../../images/photo5.webp";
import Photo1 from "../../../images/dima.webp";
import Photo2 from "../../../images/noutbook.webp";
import Photo3 from "../../../images/okul.webp";
import Photo4 from "../../../images/photo1.webp";
import Photo5 from "../../../images/photo2.webp";
import Photo6 from "../../../images/photo3.webp";
import NextIcon from "../../../images/Up.svg";
import PrevIcon from "../../../images/Down.svg";

function AboutMe() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [transition, setTransition] = useState(true);
  const photos = [Photo0, Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];
  const quotes = [
    "В нашей компании работают лучшие специалисты, которые прекрасно разбираются в современных технологиях и имеют более 10 лет опыта работы.",
    "Каждый ремонт — это вызов, который мы принимаем с энтузиазмом и профессионализмом.",
    "Мы используем только оригинальные запчасти и современное диагностическое оборудование.",
    "Ваше устройство в надежных руках — мы относимся к каждой технике, как к своей собственной."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setTransition(false);
    setTimeout(() => {
      setCurrentPhoto((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      setTransition(true);
    }, 300);
  };

  const handlePrev = () => {
    setTransition(false);
    setTimeout(() => {
      setCurrentPhoto((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      setTransition(true);
    }, 300);
  };

  return (
    <section className="about-me">
      <div className="about-me__content">
        <div className="quote-container">
          <h2 className="about-me__title">
            <span className="about-me__quote">
              {quotes[currentPhoto % quotes.length]}
            </span>
          </h2>
          <div className="quote-decoration"></div>
        </div>

        <div className="about-me__about">
          <div className="about-me__gallery">
            <div className={`image-container__about ${transition ? "fade-in" : "fade-out"}`}>
              <img 
                src={photos[currentPhoto]} 
                className="about-me__image" 
                alt="Наши специалисты за работой" 
              />
            </div>
            
            <div className="gallery-controls">
              <button className="nav-button prev" onClick={handlePrev} aria-label="Предыдущее фото">
                <img src={PrevIcon} alt="Назад" />
              </button>
              <button className="nav-button next" onClick={handleNext} aria-label="Следующее фото">
                <img src={NextIcon} alt="Вперед" />
              </button>
            </div>
            
            <div className="about-me__dots">
              {photos.map((_, index) => (
                <button
                  key={index}
                  className={`about-me__dot ${currentPhoto === index ? "active" : ""}`}
                  onClick={() => {
                    setTransition(false);
                    setTimeout(() => {
                      setCurrentPhoto(index);
                      setTransition(true);
                    }, 300);
                  }}
                  aria-label={`Перейти к фото ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;