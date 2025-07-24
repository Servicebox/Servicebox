import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

import Tv from "../../../images/tv.webp"
import Glass from "../../../images/glass.webp"
import Applefon from "../../../images/apple.webp";
import Android from "../../../images/android.webp";
import Tablet from "../../../images/tablet.webp";
import Notebook from "../../../images/notebook.webp";
import Monoblok from "../../../images/monoblok.webp";
import Devices from "../../../images/Devices.webp";
import Videocard from "../../../images/videocard.webp";

const Card = ({ title, subtitle, image, linkTo }) => {
    const serviceRef = useRef(null);
  
    const getImageByTitle = (title) => {
      const imageMap = {
        "Notebook": Notebook,
        "Monoblok": Monoblok,
        "Applefon": Applefon,
        "Android": Android,
        "Tablet": Tablet,
        "Tv": Tv,
        "Glass": Glass,
        "Devices": Devices,
        "Videocard":Videocard,
      };
      return imageMap[title];
    };
  

  
    return (
  
      <div className="card_one" ref={serviceRef} >
       
        <div className="cards">
          <div className="cover-item">
            <h3 className="card__title-one" >{title}</h3>
            <img className="card-cover" src={getImageByTitle(image)} alt={image} />
          </div>
         
          <div className="card-back">
          
            <p className="card__subtitle-one">{subtitle}</p>
            <Link className="link-card" to={linkTo}>
    <span>Посмотреть прайс</span>
</Link>
          </div>
        </div>
      </div>

   
    );
  };
  
  export default Card;