import React, { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Form from "../Form/Form";
import CookieMessage from "../CookieMessage/CookieMessage";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import "./App.css";
import WhatsAppButton from "../WhatsApp/WhatsApp";
import BallData from "../Main/BallData/BallData";

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
    // Удалите код, связанный с созданием и добавлением компонента CookieMessage
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