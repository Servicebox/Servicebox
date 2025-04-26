import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Shop from "../pages/Shop";
import Header from "../Header/Header";
import Main from "../Main/Main";
//import Footer from "../Footer/Footer";
import Form from "../Form/Form";
import CookieMessage from "../CookieMessage/CookieMessage";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
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
import NotFound from "../NotFound/NotFound";
import Cart from "../pages/Cart";
import LoginSignup from "../pages/LoginSignup"
import ShopCategory from "../pages/ShopCategory";
import Product from "../pages/Product";
import CartItems from "../CartItems/CartItems";
import { ShopContext } from "../Contexst/ShopContext";
import BubbleBackground from "../BubbleBackground/BubbleBackground";
import BreadCrums from "../Breadcrums/Breadcrum";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import { useParams } from 'react-router-dom';
import "./App.css";
import Navbar from "../NavBar";
import Addproduct from "../AdminPanel/Addproduct";
import ListProduct from "../AdminPanel/ListProduct";
import ListService from "../AdminPanel/ListService";
import Footer from "../Footer/Footer";
import AdminLogin from "../AdminPanel/AdminLogin/AdminLogin";
import AdminRoute from '../PrivateRoute/PrivateRoute';
import AdminPanel from "../AdminPanel/AdminPanel";
import VideoCard from "../AdminPanel/VideoCard/VideoCard"
import Chat from "../TelegramChat/Chat"
import VerifyEmail from '../pages/VerifyEmail';
import ResetPasswordWrapper from '../pages/ResetPasswordWrapper';
import { AuthProvider } from "../pages/AuthContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import UpdateNewsForm from "../AdminPanel/News/UpdateNewsForm";
import CreateNewsForm from "../AdminPanel/News/CreateNewsForm";
import ShopContextProvider from '../pages/ShopCategory';
import ListNews from "../AdminPanel/News/ListNews";
import NewsDetail from "../AdminPanel/News/NewsDetail";
import PublicNewsList from "../AdminPanel/News/PublicNewsList";
import PromotionsPage from "../AdminPanel/PromotionsPage/PromotionsPage";
const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoginSignupOpen, setIsLoginSignupOpen] = useState(false);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('categoryId');
  const location = useLocation();
  gsap.registerPlugin(ScrollToPlugin);

  const toggleForm = () => setIsFormOpen(!isFormOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  }, []);
  const openForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const scrollTo = (target) => gsap.to(window, { duration: 1, scrollTo: target });
  const handleLoginSuccess = () => {
    // Обновите состояние аутентификации в вашем приложении
  };

  return (
    <div className="">
      <Header />
      <div className="page__wrapper">
        <div className="nav">
          <BubbleBackground />
        </div>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/header" element={<Header />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin-panel"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route path="/image-gallery-api" element={<ImageGalleryApi />} />
          <Route path="/delete-image" element={<DeleteImage />} />
          {/* <Route exact path="/" component={ServiceRef} /> */}
          <Route path="/notebook-service" element={<NotebookService />} />
          <Route path="/monoblock-service" element={<MonoblockService />} />
          <Route path="/tv-service" element={<TvService />} />
          <Route path="/tablet-service" element={<TabletService />} />
          <Route path="/telephone-service" element={<TelephoneService />} />
          <Route path="/other-service" element={<OtherService />} />
          <Route path="/videocard" element={<VideoCard />} />
          <Route path="/glass-replacement-price-lists" element={<GlassReplacementPriceList />} />
          <Route path="/appl-service" element={<ApplService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/CreateServiceForm" element={<CreateServiceForm />} />
          <Route path="/admin-panel" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/cart-items" element={<CartItems />} />
          <Route path="/shop" element={<Shop />} />

          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/news-detali/:id" element={<NewsDetail />} />
          <Route path="/news" element={<PublicNewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/promotions-page" element={<PromotionsPage />} />
          <Route path="/create-news-form" element={<CreateNewsForm />} />
          <Route path="/listnews" element={<ListNews />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/listservice" element={<ListService />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/nav-bar" element={<Navbar />} />
          <Route path="/product-display" element={<ProductDisplay />} />
          <Route path="/parts" element={<ShopCategory category="part" />} />
          <Route path="/electronics" element={<ShopCategory category="electronic" />} />
          <Route path="/usedspareparts" element={<ShopCategory category="usedsparepart" />} />
          <Route path="/bread-crums" element={<BreadCrums />} />
          <Route path="image-gallery-api" element={<ImageGalleryApi />} />
          <Route path="delete-image" element={<DeleteImage />} />

          <Route path="/notebook-service" element={<NotebookService />} />
          <Route path="/monoblock-service" element={<MonoblockService />} />
          <Route path="/tv-service" element={<TvService />} />
          <Route path="/tablet-service" element={<TabletService />} />
          <Route path="/telephone-service" element={<TelephoneService />} />
          <Route path="/other-service" element={<OtherService />} />
          <Route path="/videocard" element={<VideoCard />} />
          <Route path="/glass-replacement-price-lists" element={<GlassReplacementPriceList />} />
          <Route path="/appl-service" element={<ApplService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="CreateServiceForm" element={<CreateServiceForm />} />
          <Route path="/admin-panel/*" element={<AdminPanelRoute />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/service" element={<Service />} />

          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/cart-items" element={<CartItems />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/listservice" element={<ListService />} />

          <Route path="/nav-bar" element={<Navbar />} />
          <Route path="/product-display" element={<ProductDisplay />} />
          <Route path="/parts" element={<ShopCategory category="part" />} />
          <Route path="/electronics" element={<ShopCategory category="electronic" />} />
          <Route path="/usedspareparts" element={<ShopCategory category="usedsparepart" />} />
          <Route path="/bread-crums" element={<BreadCrums />} />
          <Route path='/product' element={<Product />} >
            <Route path=':productId' element={<Product />} />
            <Route path=':productName' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <LoginSignup
                  isOpen={true}
                  onClose={() => { }}
                  onLoginSuccess={handleLoginSuccess}
                />
              </ProtectedRoute>
            }
          />

          <Route path="/reset-password/:token" element={<ResetPasswordWrapper />} />

          <Route path="*" element={<NotFound />} />

        </Routes>

        {isFormOpen && <Form toggleForm={toggleForm} />}
        <CookieMessage />


        <Chat />

        <Footer />
      </div>
    </div>
  )

}


export default App;