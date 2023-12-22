import React, { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import axios from 'axios';

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Form from "../Form/Form";
import CookieMessage from "../CookieMessage/CookieMessage";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
//import Products from "../Products/";
import "./App.css";
import WhatsAppButton from "../WhatsApp/WhatsApp";
import BallData from "../Main/BallData/BallData";

function App() {
  gsap.registerPlugin(ScrollToPlugin);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = useCallback(() => {
    setIsFormOpen(!isFormOpen);
  }, [isFormOpen]);

  useEffect(() => {
    axios.get('https://servicebox35.ru/products.php') 
      .then(response => {
        console.log(response.data); // обработка полученных данных
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });

  }, []);

  return (
    <Router>
      <div className="page">
        <div className="page__wrapper">
        <Header scrollTo={scrollTo} />
          <Routes>
            <Route exact path="/" element={<Main />} />
            {/*<Route path="/products" element={<Products />} />*/}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
          {isFormOpen && <Form toggleForm={toggleForm} />}
          <Footer />
          <CookieMessage />
        </div>
      </div>
    </Router>
  );
}

export default App;