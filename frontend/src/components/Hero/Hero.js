import React from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import hand_icon from "../Assets/hand_icon.png"
import arrow_icon from "../Assets/arrow.png"
import hero_image from "../Assets/hero_image.png"
import './Hero.css'


const Hero = () => {
    return (
        <div className='hero'>
            <div className='hero-left'>
                <h2>Новое поступление</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt="иконка" />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="иконка" />
                </div>
            </div>
            <div className='hero-right'>
                <img src={hero_image} alt="иконка" />
            </div>
        </div>
    );
}

export default Hero