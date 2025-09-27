import React, { useState, useCallback, useEffect } from "react";
import {
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
import BubbleBackground from "../BubbleBackground/BubbleBackground";
import BreadCrums from "../Breadcrums/Breadcrum";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import "./App.css";
import Navbar from "../NavBar";
import ListProduct from "../AdminPanel/ListProduct";
import ListService from "../AdminPanel/ListService";
import Footer from "../Footer/Footer";
import AdminRoute from '../PrivateRoute/PrivateRoute';
import AdminPanel from "../AdminPanel/AdminPanel";
import VideoCard from "../AdminPanel/VideoCard/VideoCard"
import Chat from "../TelegramChat/Chat"
import VerifyEmail from '../pages/VerifyEmail';
import ResetPasswordWrapper from '../pages/ResetPasswordWrapper';
import { AuthProvider } from "../pages/AuthContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CreateNewsForm from "../AdminPanel/News/CreateNewsForm";
import ListNews from "../AdminPanel/News/ListNews";
import NewsDetail from "../AdminPanel/News/NewsDetail";
import PublicNewsList from "../AdminPanel/News/PublicNewsList";
import PromotionsPage from "../AdminPanel/PromotionsPage/PromotionsPage";
import AdminUsersPanel from "../AdminPanel/AdminPanelRoute/AdminUsersPanel";
import SearchBar from "../pages/SearchBar"
import UserProfile from "../pages/UserProfile";
import DepositoryPage from "../AdminPanel/DepositoryPage";
import DepositoryPublic from '../pages/DepositoryPublic';
import ChatWithGpt from "../ChatWithGpt/ChatWithGpt";
import ServicePricePage from '../ServicePricePage/ServicePricePage';
import ServicesGrid from '../ServicesGrid/ServicesGrid';
import ServiceCategoryPage from '../ServiceCategoryPage/ServiceCategoryPage';
import AllServicesPage from '../AllServicesPage/AllServicesPage';
import BookingsAdmin from "../AdminPanel/BookingsAdmin/BookingsAdmin";
import BookingForm from "../BookingForm/BookingForm";
import GEOSEO from "../GEOSEO";
import ReviewsSection from "../ReviewsSection/ReviewsSection"

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
  const [showForm, setShowForm] = useState(false);
  const handleFormToggle = () => setShowForm(prev => !prev);
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

  useEffect(() => {
 const checkAuth = async () => {
  const token = localStorage.getItem('auth-token');
  if (!token) return;
  
  try {
    const response = await fetch('https://servicebox35.pp.ru/api/auth/validate-token', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      // Исправлено: сохраняем user из ответа
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      
      // Сохраняем данные в localStorage
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('role', data.user.role);
    } else {
      signOut();
    }
  } catch (error) {
    signOut();
  }
};

    checkAuth();
  }, []);

const handleLoginSuccess = (responseData) => {
  // Сохраняем полные данные пользователя
  localStorage.setItem('auth-token', responseData.token.accessToken);
  localStorage.setItem('refresh-token', responseData.refreshToken);
  localStorage.setItem('username', responseData.user.username);
  localStorage.setItem('role', responseData.user.role);
  
  setCurrentUser(responseData.user);
  setIsLoggedIn(true);
};

  const signOut = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };
  return (
    
    <AuthProvider value={{ currentUser, isLoggedIn, signOut, handleLoginSuccess }}>
      <GEOSEO />
    <div className="">
      <Header />
      <BubbleBackground />
      <div className="page__wrapper">
          
        <div className="nav">

        </div>

        <Routes>
          <Route path="/" element={<Main />} />
           <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
          <Route path="/header" element={<Header />} />
          <Route path="/admin-panel/*" element={<AdminPanel />} />
          <Route path="/depository-public" element={<DepositoryPublic />} />
          <Route path="/depository" element={<DepositoryPage />} />
          <Route path="/image-gallery-api" element={<ImageGalleryApi />} />
          <Route path="users" element={<AdminUsersPanel />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/delete-image" element={<DeleteImage />} />
          <Route pach="form" element={<Form />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/bookings" element={<BookingsAdmin />} />
          <Route path="/booking/:admin" element={<BookingsAdmin />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/booking/:id/:admin" element={<BookingForm />} />
          <Route path="/booking/:id/:admin/:status" element={<BookingForm />} />
          <Route path="/booking/:id/:admin/:status/:user" element={<BookingForm />} />
       
           <Route path="/" element={<ServicesGrid />} />
            <Route path="/services/:categoryId" element={<ServiceCategoryPage />} />
              <Route path="/prices" element={<AllServicesPage />} />
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
          <Route path="/glass-replacement-price-lists" element={<GlassReplacementPriceList />} />
          <Route path="/appl-service" element={<ApplService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="CreateServiceForm" element={<CreateServiceForm />} />
          <Route path="/admin-panel/*" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/service" element={<Service />} />
          <Route path="search-bar" element={<SearchBar />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/cart-items" element={<CartItems />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/depository" element={<DepositoryPage />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/listservice" element={<ListService />} />
          <Route path="/chat-with-gpt" element={<ChatWithGpt />} />
          <Route path="/nav-bar" element={<Navbar />} />
          <Route path="/product-display" element={<ProductDisplay />} />
          <Route path="/parts" element={<ShopCategory category="part" />} />
          <Route path="/electronics" element={<ShopCategory category="electronic" />} />
          <Route path="/usedspareparts" element={<ShopCategory category="usedsparepart" />} />
          <Route path="/bread-crums" element={<BreadCrums />} />
          <Route path='/product' element={<Product />} >
          <Route path='/product/:productSlug' element={<Product/>} />
          <Route path='/product/:productName' element={<Product/>} />
            <Route path=':productSlug' element={<Product />} />            
            <Route path=':productName' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path="/prices" element={<ServicePricePage />} />


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
      
        {showForm && <Form toggleForm={handleFormToggle} />}
        <CookieMessage />


        <Chat />
 <ReviewsSection />
        <Footer />
        
      </div>
    </div>
    </AuthProvider>
  )

}


export default App;