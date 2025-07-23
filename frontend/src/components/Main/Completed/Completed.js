import React, { useState, useEffect } from "react";
import "./Completed.css";
import PrevButton from "../../../images/Down.svg";
import NextButton from "../../../images/Up.svg";
import One from "../../../images/1.webp";
import Two from "../../../images/2.webp";
import Three from "../../../images/3.webp";
import Four from "../../../images/4.webp";
import Five from "../../../images/5.webp";
import Six from "../../../images/7.webp";
import Seven from "../../../images/8.webp";
import Eight from "../../../images/9.webp";
import Nine from "../../../images/photo1.jpeg";
import Ten from "../../../images/11.webp";
import Eleven from "../../../images/12.webp";
import Twelve from "../../../images/13.webp";
import Thirteen from "../../../images/14.webp";
import Foourteen from "../../../images/15.webp";

// Создаем массив фотографий с защитой от отсутствующих значений
const PHOTOS = [
  { image: One, text: "Замена аккумулятора на роботе-пылесосе" },
  { image: Two, text: "Замена материнской платы на Ipad" },
  { image: Three, text: "Замена HDMI порта" },
  { image: Four, text: "Комплексная чистка и замена аккумулятора на macbook" },
  { image: Five, text: "Комплексная чистка macbook pro" },
  { image: Six, text: "Замена аккумулятора на телефоне" },
  { image: Seven, text: "Замена сокета на материнской плате" },
  { image: Eight, text: "Восстановление подсветки дисплея и замена динамика на видеорегистраторе" },
  { image: Nine, text: "Ребол процессора на материнской плате" },
  { image: Ten, text: "Замена дисплейного модуля и задней крышки" },
  { image: Eleven, text: "Комплексная чистка, замена куллера и установка драйверов на ноутбуке" },
  { image: Twelve, text: "Замена хаба на материнской плате" },
  { image: Thirteen, text: "Замена дисплейного модуля на Iphone" },
  { image: Foourteen, text: "Комплексное обслуживание Macbook pro и замена touch bar" },
].filter(item => item.image); // Фильтруем элементы без изображения

function Completed() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAnimating, setIsAnimating] = useState(false);

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Проверка на мобильное устройство
  const isMobile = windowWidth <= 768;

  // Функции навигации с анимацией
  const navigate = (direction) => {
    if (isAnimating || PHOTOS.length === 0) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPhoto(prev => (prev === PHOTOS.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentPhoto(prev => (prev === 0 ? PHOTOS.length - 1 : prev - 1));
      }
      setIsAnimating(false);
    }, 300);
  };

  // Обработчики свайпа
  const handleSwipeStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleSwipeMove = (e) => {
    if (!touchStartX) return;
    
    const touchEndX = e.touches[0].clientX;
    const diff = touchEndX - touchStartX;
    
    if (diff > 50) {
      navigate('prev');
      touchStartX = null;
    } else if (diff < -50) {
      navigate('next');
      touchStartX = null;
    }
  };

  // Защита от пустого массива
  if (PHOTOS.length === 0) {
    return (
      <section className="completed">
        <h2 className="animated-title">Наши работы</h2>
        <div className="error-message">
          Изображения временно недоступны
        </div>
      </section>
    );
  }

  return (
    <section className="completed">
      <h2 className="animated-title">Наши работы</h2>
      
      {isMobile ? (
        <div 
          className={`completed__carousel ${isAnimating ? 'animating' : ''}`}
          onTouchStart={handleSwipeStart}
          onTouchMove={handleSwipeMove}
        >
          <div className="slide-container">
            <img 
              src={PHOTOS[currentPhoto].image} 
              alt="Пример нашей работы" 
              className="completed__carousel-img"
              onError={(e) => e.target.src = '/fallback-image.webp'} // Запасное изображение
            />
            <div className="completed__carousel-overlay">
              <span className="completed__carousel-text">
                {PHOTOS[currentPhoto].text}
              </span>
            </div>
          </div>
          
          <div className="completed__dots">
            {PHOTOS.map((_, index) => (
              <span 
                key={index} 
                className={`completed__dot ${currentPhoto === index ? "active" : ""}`}
                onClick={() => {
                  if (!isAnimating) setCurrentPhoto(index);
                }}
              />
            ))}
          </div>
          
          <div className="completed__carousel-controls">
            <button 
              className="completed__carousel-btn" 
              onClick={() => navigate('prev')}
              aria-label="Предыдущая работа"
            >
              <img className="completted__prev-image" src={PrevButton} alt="Назад" />
            </button>
            <button 
              className="completed__carousel-btn" 
              onClick={() => navigate('next')}
              aria-label="Следующая работа"
            >
              <img className="completted__next-image" src={NextButton} alt="Вперед" />
            </button>
          </div>
        </div>
      ) : (
        <div className="completed__grid">
          {PHOTOS.map((photo, index) => (
            <div
              key={index}
              className="completed__grid-item"
              onMouseEnter={() => setCurrentPhoto(index)}
            >
              <img 
                src={photo.image} 
                alt="Пример нашей работы" 
                className="completed__grid-img"
                onError={(e) => e.target.src = '/fallback-image.webp'} // Запасное изображение
              />
              <div className="completed__grid-overlay">
                <span className="completed__grid-text">{photo.text}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Completed;