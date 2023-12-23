import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import axios from 'axios';

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Form from "../Form/Form";
import CookieMessage from "../CookieMessage/CookieMessage";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
//import Products from "../Products/Products";
import "./App.css";
import WhatsAppButton from "../WhatsApp/WhatsApp";
import BallData from "../Main/BallData/BallData";

function App() {
gsap.registerPlugin(ScrollToPlugin);
const [isFormOpen, setIsFormOpen] = useState(false);

const toggleForm = useCallback(() => {
setIsFormOpen(prevState => !prevState);
}, []);

useEffect(() => {
const requestData = {
auth_id: '5948',
auth_key: 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp',
method: 'catalog.getElementList',
limit: 10,
page: 1
};

axios.post('https://optfm.ru/api/', requestData)
  .then(response => {
    console.log(response.data); // Обработка полученных данных
  })
  .catch(error => {
    console.error('Ошибка при получении данных:', error);
  });
}, []);

return (
<Router>
<div className="page">
<div className="page__wrapper">
<Header />
<Routes>
<Route exact path="/" element={<Main />} />
{/*<Route path="/products" element={<Products />} />/*/}
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