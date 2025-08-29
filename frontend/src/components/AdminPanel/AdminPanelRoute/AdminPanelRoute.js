import React from 'react';
import { NavLink, Link, Route, Routes } from 'react-router-dom';
import "../AdminPanel.css"
import CreateImage from '../Image/CreateImage';
import CreateServiceForm from './CreateServiceForm';
import DeleteService from './DeleteService';
import UpdateService from './UpdateService';
import DeleteImage from '../Image/DeleteImage';
import ListProduct from '../ListProduct';
import Addproduct from '../Addproduct';
import AdminLogin from '../AdminLogin/AdminLogin';
import PrivateRoute from '../AdminLogin/PrivateRoute';
import ListService from '../ListService';
import ImageList from '../Image/ImageList';
import CreateNewsForm from '../News/CreateNewsForm';
import ListNews from '../News/ListNews';
import UpdateNewsForm from '../News/UpdateNewsForm';
import AdminPromotions from '../AdminPromotions';
import AdminUsersPanel from './AdminUsersPanel';
import DepositoryPage from '../DepositoryPage';
import BookingsAdmin from '../BookingsAdmin/BookingsAdmin';
import TrackingPage from '../../TrackingPage/TrackingPage';
import CategoriesList from '../CategoriesList';
import SubcategoriesList from '../SubcategoriesList';


const AdminPanelRoute = () => {
  return (
    <div className='admin-panel'>

      {/*<Link className='admin__link' to="/admin-panel/create">Создание Услуги</Link>*/}
      {/*<Link className='admin__link' to="/admin-panel/delete">Удаление услуги</Link>*/}
      {/*<Link className='admin__link' to="/admin-panel/update">Обновление услуги</Link>*/}
      <NavLink className='admin__link' to="/admin-panel/listservice">Услуги список</NavLink>
      {/* <Link className='admin__link' to="/admin-panel/create-image">Загрузка Изображения</Link>
      <Link className='admin__link' to="/admin-panel/delete-image">Удаление Изображения</Link>*/}
      <NavLink className='admin__link' to="/admin-panel/listproduct">Товары список</NavLink>
       <NavLink className='admin__link' to="/admin-panel/categories">Категории</NavLink>
      <NavLink className='admin__link' to="/admin-panel/subcategories">Подкатегории</NavLink>
      {/*<Link className='admin__link' to="/admin-panel/addproduct">Добавить товар</Link>*/}
      <NavLink className='admin__link' to="/admin-panel/imagelist">Фото все</NavLink>
      <NavLink className='admin__link' to="/admin-panel/addnews">Добавить новость</NavLink>
      <NavLink className='admin__link' to="/admin-panel/listnews">Список новостей</NavLink>
      <NavLink className='admin__link' to="/admin-panel/promotions">Акции</NavLink>
      <NavLink className='admin__link' to="/admin-panel/users">Пользователи</NavLink>
        <NavLink className='admin__link' to="/admin-panel/bookings">Бронирования</NavLink>
        
      <NavLink className='admin__link' to="/admin-panel/tracking">Отслеживание</NavLink>

      <NavLink to="/depository">Депозиторий файлов</NavLink>

      <div className='admin-links'>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="listproduct" element={<ListProduct />} />
             <Route path="categories" element={<CategoriesList />} />
          <Route path="subcategories" element={<SubcategoriesList />} />
          <Route path="listservice" element={<ListService />} />
          <Route path="create-image" element={<CreateImage />} />
          <Route path="delete-image" element={<DeleteImage />} />
          <Route path="create" element={<CreateServiceForm />} />
          <Route path="delete" element={<DeleteService />} />
          <Route path="update" element={<UpdateService />} />
          <Route path="imagelist" element={<ImageList />} />
          <Route path="addnews" element={<CreateNewsForm />} />
          <Route path="promotions" element={<AdminPromotions />} />
          <Route path="listnews" element={<ListNews />} />
          <Route path="update-news/:id" element={<UpdateNewsForm />} />
          <Route path="promotions" element={<AdminPromotions />} />
          <Route path="users" element={<AdminUsersPanel />} />
          <Route path="bookings" element={<BookingsAdmin />} />
          <Route path="depository" element={<DepositoryPage />} />
   
          <Route path="tracking" element={<TrackingPage />} />

        </Routes>
      </div>
    </div>
  );
};

export default AdminPanelRoute;