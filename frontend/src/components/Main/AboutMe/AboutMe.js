import React, { useState, useEffect } from "react";
import "./AboutMe.css";
import Photo0 from "../../../images/photo5.jpeg";
import Photo1 from "../../../images/dima.jpeg";
import Photo2 from "../../../images/noutbook.jpeg";
import Photo3 from "../../../images/okul.jpeg";
import Photo4 from "../../../images/photo1.jpeg"
import Photo5 from "../../../images/photo2.jpeg"
import Photo6 from "../../../images/photo3.jpeg"
import PrevButtonImage from "../../../images/Down.svg";
import NextButtonImage from "../../../images/Up.svg";

function AboutMe() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photos = [Photo0, Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prevPhoto) => (prevPhoto === photos.length - 1 ? 0 : prevPhoto + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentPhoto((prevPhoto) => (prevPhoto === photos.length - 1 ? 0 : prevPhoto + 1));
  };

  const handlePrev = () => {
    setCurrentPhoto((prevPhoto) => (prevPhoto === 0 ? photos.length - 1 : prevPhoto - 1));
  };

  return (
    <section className="about-me">
      <div className="about-me__content">
        <h2 className="about-me__title">
          <span className="about-me__quote">
            В нашей компании работают лучшие специалисты, которые прекрасно разбираются в современных технологиях и имеют
            более 10-х лет опыта работы.
          </span>
        </h2>
        <div className="about-me__about">
          <div className="about-me__text">
            <p className="about-me__subtitle">
              За счет этого мы гарантируем устранение любых неполадок и предоставляем гарантию на все выполненные работы.
            </p>
            <p className="about-me__subtitle">
              Мы поможем не только восстановить работоспособность техники, но и подскажем, как избежать возникновения
              подобных поломок в будущем.
            </p>
            <p className="about-me__subtitle">
              Квалифицированная консультация специалиста поможет безопасно пользоваться компьютером. В нашем штате
              работают опытные специалисты.
            </p>
          </div>
          <div className="about-me__gallery">
            <img src={photos[currentPhoto]} className="about-me__image" alt="фотография" />
            <div className="about-me__gallery-controls">
              <button className="about-me__prev-button" onClick={handlePrev}>
                <img className="about-me__prev-image" src={PrevButtonImage} alt="назад" />
              </button>
              <button className="about-me__next-button" onClick={handleNext}>
                <img className="about-me__next-image" src={NextButtonImage} alt="вперед" />
              </button>
            </div>
            <div className="about-me__dots">
              {photos.map((_, index) => (
                <span
                  key={index}
                  className={`about-me__dot ${currentPhoto === index ? "active" : ""}`}
                  onClick={() => setCurrentPhoto(index)}
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