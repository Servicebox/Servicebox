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
import CardBody from "../Card/CardBody";
import Button from "../Button/Button";
//import { Products } from "../Products/Products";
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
import WhatsAppButton from "../WhatsApp/WhatsApp";
import BallData from "../Main/BallData/BallData";

function App() {
gsap.registerPlugin(ScrollToPlugin);
const [isFormOpen, setIsFormOpen] = useState(false);
const [items, setItem] = useState([]);
const [searchValue, setSearchValue] = useState("");
const [addedItems, setAddedItem] = useState([]);
const [showAddProducts, setShowAddProducts] = useState(false);

const toggleForm = useCallback(() => {
setIsFormOpen(prevState => !prevState);
}, []);


useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append('auth_id', '5948');
        formData.append('auth_key', 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp');
        formData.append('method', 'catalog.getSectionList');
        
        const response = await axios.post("https://optfm.ru/api/", formData);
        console.log(response.data);
        setItem(response.data); // assuming the response data is the items to be set
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }
  const itmesFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }
   console.log(addedItems);
  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
     console.log(addedItems);
  }

return (
<Router>
<div className="page">
<div className="page__wrapper">
<div className="nav">
<Header />
</div>
<Routes>
<Route exact path="/" element={<Main />} />

<Route path="/products" element={
          <CardBody
            items={items}
            searchValue={searchValue}
            changingSearchData={changingSearchData}
            setShowAddProducts={setShowAddProducts}
            showAddProducts={showAddProducts}
            addedItems={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItem}
            itmesFilter={itmesFilter}
            addItem={addItem}
          />
        } />
      <Route exact path="/" component={ServiceRef} />
        {/*<Route exact path="/services/:category" component={ServiceRef} />*/}
        <Route path="/notebook-service" element={<NotebookService />} />/
        <Route path="/monoblock-service" element={<MonoblockService />} />/
        <Route path="/tv-service" element={<TvService />} />/
        <Route path="/tablet-service" element={<TabletService />} />/
        <Route path="/telephone-service" element={<TelephoneService />} />/
        <Route path="/other-service" element={<OtherService />} />/
        <Route path="/glass-replacement-price-lists" element={<GlassReplacementPriceList />} />

<Route path="/appl-service" element={<ApplService />} />/
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="CreateServiceForm" element={<CreateServiceForm />} />

<Route path="/admin" element={<AdminPanelRoute />} />
        <Route path="/admin/create" element={<CreateServiceForm />} />
        <Route path="/admin/delete" element={<DeleteService />} />
        <Route path="/admin/update" element={<UpdateService/>} />
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