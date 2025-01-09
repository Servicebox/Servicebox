import React, { useEffect, useRef, forwardRef } from "react";
import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

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