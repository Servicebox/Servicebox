// Card.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

import Tv from "../../../images/tv.webp";
import Glass from "../../../images/glass.webp";
import Applefon from "../../../images/apple.webp";
import Android from "../../../images/android.webp";
import Tablet from "../../../images/tablet.webp";
import Notebook from "../../../images/notebook.webp";
import Monoblok from "../../../images/monoblok.webp";
import Devices from "../../../images/Devices.webp";
import Videocard from "../../../images/videocard.webp";

const Card = ({ title, subtitle, image, linkTo }) => {
  const serviceRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const getImageByTitle = (title) => {
    const imageMap = {
      Notebook: Notebook,
      Monoblok: Monoblok,
      Applefon: Applefon,
      Android: Android,
      Tablet: Tablet,
      Tv: Tv,
      Glass: Glass,
      Devices: Devices,
      Videocard: Videocard,
    };
    return imageMap[title] || imageMap[image] || ""; // Fallback to image prop if title not found
  };

  // Handle click outside to flip back
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        setIsFlipped(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
    if (e.key === "Escape" && isFlipped) {
      e.preventDefault();
      setIsFlipped(false);
    }
  };

  return (
    <article
      ref={serviceRef}
      className={`card_one ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={title}
    >
      <div className="cards">
        <div className="cover-item">
          <h3 className="card__title-one">{title}</h3>
          <img className="card-cover" src={getImageByTitle(image)} alt={image} loading="lazy" />
        </div>

        <div className="card-back">
          <p className="card__subtitle-one">{subtitle}</p>
          <Link className="link-card" to={linkTo}>
            <span>Посмотреть прайс</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Card;