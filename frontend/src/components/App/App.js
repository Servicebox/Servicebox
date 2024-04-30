import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import axios from 'axios';

import Header from "../Header/Header";
import Main from "../Main/Main"; 
//import Footer from "../Footer/Footer";
import Form from "../Form/Form";
import CookieMessage from "../CookieMessage/CookieMessage";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import Search from "../Search/Search";


import ServiceRef from "../Main/ServiceRef/ServiceRef";
import NotebookService from "../AdminPanel/NotebookService/NotebookService"
import MonoblockService from "../AdminPanel/MonobloсkService/MonobloсkService"
import TelephoneService from "../AdminPanel/TelephoneService/TelephoneService";
import TabletService from "../AdminPanel/TabletService/TabletService";
import TvService from "../AdminPanel/TvService/TvService"
import GlassReplacementPriceList from "../AdminPanel/GlassReplacementPriceList/GlassReplacementPriceList";
import ApplService from "../ApplService/ApplService";
import OtherService from "../AdminPanel/OtherService/OtherService"
import CreateServiceForm from "../AdminPanel/AdminPanelRoute/CreateServiceForm";
import AdminPanelRoute from "../AdminPanel/AdminPanelRoute/AdminPanelRoute"

import ImageGalleryApi from "../AdminPanel/Image/ImageGalleryApi"
import DeleteImage from "../AdminPanel/Image/DeleteImage";
import Contacts from "../Contacts/Contacts";
import Service from "../Service/Service";
import About from "../About/About";



import CardBody from "../Card/CardBody";
import BubbleBackground from "../BubbleBackground/BubbleBackground";
import Widget from "../Widget/Widget";
//import TelegramWidget from "../TelegramWidget/TelegramWidget";



import { useParams } from 'react-router-dom';
import "./App.css";

function App() {
  gsap.registerPlugin(ScrollToPlugin);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('categoryId');

  return (
    <div className="page">
      <Header />
      {/*<TelegramWidget/>*/}
      <div className="page__wrapper">
        <div className="nav">
          <BubbleBackground />
        </div>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="image-gallery-api" element={<ImageGalleryApi />} />
          <Route path="delete-image" element={<DeleteImage />} />
          <Route exact path="/" component={ServiceRef} />
          <Route path="/card-body" element={<CardBody />} />
          <Route path="/notebook-service" element={<NotebookService />} />
          <Route path="/monoblock-service" element={<MonoblockService />} />
          <Route path="/tv-service" element={<TvService />} />
          <Route path="/tablet-service" element={<TabletService />} />
          <Route path="/telephone-service" element={<TelephoneService />} />
          <Route path="/other-service" element={<OtherService />} />
          <Route path="/glass-replacement-price-lists" element={<GlassReplacementPriceList />} />
          <Route path="/appl-service" element={<ApplService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="CreateServiceForm" element={<CreateServiceForm />} />
          <Route path="/admin/*" element={<AdminPanelRoute />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {isFormOpen && <Form toggleForm={toggleForm} />}
        <Widget/>
       
        <CookieMessage />
      </div>
    </div>
  );
}

export default App;