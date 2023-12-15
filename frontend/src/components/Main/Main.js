import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, useLocation } from "react-router-dom";
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


function Main() {
  const location = useLocation();
  const mainRef = useRef(null);
  const serviceRef = useRef(null);
  const aboutRef = useRef(null);
  const contactsRef = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <main className="main" ref={mainRef}>
      <Element name="mainBanner">
        <MainBanner />
      </Element>
      <Element name="serviceRef" ref={serviceRef}>
        <ServiceRef serviceRef={serviceRef} />
      </Element>
      <Element name="aboutRef" ref={aboutRef}>
        <AboutRef aboutRef={aboutRef} />
      </Element>
      <Completed />
      <ArronService />
   
      <AboutMe />
      <Gifts />
      <Element name="contactsRef" ref={contactsRef}>
        <ContactsRef contactsRef={contactsRef} />
      </Element>
    </main>
  );
}

export default Main;