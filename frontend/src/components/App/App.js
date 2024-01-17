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
import Search from "../Search/Search";
import AddProducts from "../AddProducts/AddProducts";
import List from "../List/List"
import CardBody from "../Card/CardBody";
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
import DeleteService from "../AdminPanel/AdminPanelRoute/DeleteService";
import UpdateService from "../AdminPanel/AdminPanelRoute/UpdateService";
import Api from "../Api"
import "./App.css";

function App() {
  gsap.registerPlugin(ScrollToPlugin);
  const [isFormOpen, setIsFormOpen] = useState(false);
 

 /** const toggleForm = useCallback(() => {
    setIsFormOpen(prevState => !prevState);
  }, []);

  // Функция для выполнения запроса к стороннему API
  const fetchDataFromAPI = async () => {
    try {
      // Данные для аутентификации в API
      const authData = {
        auth_id: '5948',
        auth_key: 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp',
        method: 'catalog.getSectionList',
        limit: 500,
        page: 0
      };

      // Выполняем POST-запрос к стороннему API
      const response = await axios.post('https://optfm.ru/api/', authData);

      // Получаем данные из ответа в формате JSON
      const data = response.data;

      // Устанавливаем полученные данные в состояние вашего компонента
      setItems(data.response.items); // предполагается, что ваш ответ включает поле response с полем items

      // Другие обработки данных...
    } catch (error) {
      console.error('Error:', error); // Обработка ошибок
    }
  };

  // Вызываем функцию для выполнения запроса при монтировании компонента
  useEffect(() => {
    fetchDataFromAPI();
  }, []);
**/

  return (
    <Router>
      <div className="page">
        <div className="page__wrapper">
          <div className="nav">
            <Header />

          </div>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/" component={ServiceRef} />
            <Route path="/api" element={<Api />}  />
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
            <Route path="/admin" element={<AdminPanelRoute />} />
            <Route path="/admin/create" element={<CreateServiceForm />} />
            <Route path="/admin/delete" element={<DeleteService />} />
            <Route path="/admin/update" element={<UpdateService />} />
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