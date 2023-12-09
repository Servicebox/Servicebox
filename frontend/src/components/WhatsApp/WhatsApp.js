import React, { useState } from "react";
import WhatsApp from "../../images/whatsapp.svg";
import "./WhatsApp.css";

const WhatsAppButton = () => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const rippleSize = Math.max(buttonRect.width, buttonRect.height) * 2;
    const offsetLeft = e.clientX - buttonRect.left - rippleSize / 2;
    const offsetTop = e.clientY - buttonRect.top - rippleSize / 2;

    const newRipple = {
      x: offsetLeft,
      y: offsetTop,
      id: Date.now(),
    };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id));
    }, 2000);
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple-effect"
          style={{ left: ripple.x, top: ripple.y, width: "60px", height: "60px" }}
        ></div>
      ))}
      <a href="whatsapp://send?phone=79062960353">
        <img className="whatsapp-img" src={WhatsApp} alt="WhatsApp" />
      </a>
    </div>
  );
};

export default WhatsAppButton;