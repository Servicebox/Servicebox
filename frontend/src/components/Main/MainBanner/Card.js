import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

import Tv from "../../../images/tv.png"
import Glass from "../../../images/Glass.png"
import Applefon from "../../../images/apple.png";
import Android from "../../../images/android.png";
import Tablet from "../../../images/tablet.png";
import Notebook from "../../../images/notebook.png";
import Monoblok from "../../../images/monoblok.png";
import Devices from "../../../images/Devices.png";

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
        "Devices": Devices
      };
      return imageMap[title];
    };
  

  
    return (
  
      <div className="card_one" ref={serviceRef} >
       
        <div className="card">
          <div className="cover item">
            <h3 className="card__title-one" >{title}</h3>
            <img className="card-cover" src={getImageByTitle(image)} alt={image} />
          </div>
         
          <div className="card-back">
          
            <h4 className="card__subtitle-one">{subtitle}</h4>
            <Link className="link" to={linkTo}>
              Посмотреть прайс
            </Link>
          </div>
        </div>
      </div>

   
    );
  };
  
  export default Card;