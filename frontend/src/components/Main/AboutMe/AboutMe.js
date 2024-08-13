import React, { useState, useEffect } from "react";
import "./AboutMe.css";
import Photo0 from "../../../images/photo5.webp";
import Photo1 from "../../../images/dima.webp";
import Photo2 from "../../../images/noutbook.webp";
import Photo3 from "../../../images/okul.webp";
import Photo4 from "../../../images/photo1.webp"
import Photo5 from "../../../images/photo2.webp"
import Photo6 from "../../../images/photo3.webp"


function AboutMe() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photos = [Photo0, Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prevPhoto) => (prevPhoto === photos.length - 1 ? 0 : prevPhoto + 1));
    }, 8080);
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
            более 10 лет опыта работы.
          </span>
        </h2>
        <div className="about-me__about">
          <div className="about-me__gallery">
            <img src={photos[currentPhoto]} className="about-me__image" alt="фотография" />
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