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

import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function Main() {

  const location = useLocation();


  return (
    <div>

    <main className="main">

      <MainBanner />
    <ServiceRef />
  <AboutRef />
      <Completed />
      <ArronService />
      <AboutMe />
      <Gifts />
      
      
     

  <ContactsRef />

      
    </main>
 
    </div>
  );
}

export default Main;