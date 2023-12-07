import React, { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { sendMessageToTelegram } from '../utils/Api'; // Импорт функции sendMessageToTelegram из файла api.js
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Form from "../Form/Form";
import CookieMessage from "../CookieMessage/CookieMessage";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import "./App.css";

function App() {
  gsap.registerPlugin(ScrollToPlugin);

  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const contactsRef = useRef(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = useCallback(() => {
    setIsFormOpen(!isFormOpen);
  }, [isFormOpen]);

  const scrollTo = (target) =>
    gsap.to(window, { duration: 1, scrollTo: target });

  useEffect(() => {
    // Вызов функции sendMessageToTelegram из импортированного файла api.js
    sendMessageToTelegram("Привет, это тестовое сообщение из приложения");
  }, []);

  return (
    <Router>
      <div className="page">
        <div className="page__wrapper">
          <Header scrollTo={scrollTo} />
          <Main
            aboutRef={aboutRef}
            serviceRef={serviceRef}
            contactsRef={contactsRef}
          />
          <Routes>
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
          {isFormOpen && <Form toggleForm={toggleForm} />}
          <CookieMessage /> 
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;