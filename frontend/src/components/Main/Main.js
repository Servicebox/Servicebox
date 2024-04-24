import React, { useEffect, useRef, forwardRef } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Element } from "react-scroll";
import "./Main.css";

import MainBanner from "./MainBanner/MainBanner";
import ServiceRef from "./ServiceRef/ServiceRef";
import AboutRef from "./AboutRef/AboutRef";
import ContactsRef from "./ContactsRef/ContactsRef";
import Completed from "./Completed/Completed";
import ArronService from "./ArronService/ArronService";
import AboutMe from "./AboutMe/AboutMe";
import Gifts from "./Gifts/Gifts";
import BallData from "./BallData/BallData";
import Header from "../Header/Header";
import TelegramWidget from "../TelegramWidget/TelegramWidget";

function Main() {
  gsap.registerPlugin(ScrollToPlugin);
  const location = useLocation();
  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const contactsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  const scrollTo = (target) => {
    // Прокрутка до целевого элемента
    gsap.to(window, { duration: 1, scrollTo: { y: target.current, autoKill: false } });
  };

  return (
    <div>

    <main className="main">

      <MainBanner />
     
      <Element name="serviceRef" ref={serviceRef}>
  <ServiceRef />
</Element>
<Element name="aboutRef" ref={aboutRef}>
  <AboutRef />
  </Element>
  <TelegramWidget/>
      <Completed />
      <ArronService />
      <AboutMe />
      <Gifts />
      
      
     
<Element name="contactsRef" ref={contactsRef}>
  <ContactsRef />
</Element>
      
    </main>
    </div>
  );
}

export default Main;