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
import "./App.css";

function App() {
  gsap.registerPlugin(ScrollToPlugin);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [Value, setValue] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const url = "https://servicebox35.pp.ru/products";

  const toggleForm = useCallback(() => {
    setIsFormOpen(prevState => !prevState);
  }, []);

  useEffect(() => {
    axios.post(url)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function changingSearchData(e) {
    setValue(e.target.value);
  }

  const itemsFilter = items.filter((item) =>
    item.title.toLowerCase().includes(Value.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    setAddedItems([...addedItems, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItems(newItems);
  }

  return (
    <Router>
      <div className="page">
        <div className="page__wrapper">
          <div className="nav">
            <Header />
            <div className="nav-right"></div>
            <List products={items} />
            {showAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItems}
          />
        )}

          </div>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/products" element={
          <CardBody
            items={items}
            Value={Value}
            changingSearchData={changingSearchData}
            setShowAddProducts={setShowAddProducts}
            showAddProducts={showAddProducts}
            addedItems={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItems}
            itmesFilter={itemsFilter}
            addItem={addItem}
          />
        } />
            <Route exact path="/" component={ServiceRef} />
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