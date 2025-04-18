import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import "./AdminPanelRoute.css"
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


const AdminPanelRoute = () => {
  return (
    <div className='admin-panel'>
      <Link className='admin__link' to="/admin-panel/create">Создание Услуги</Link>
      <Link className='admin__link' to="/admin-panel/delete">Удаление услуги</Link>
      <Link className='admin__link' to="/admin-panel/update">Обновление услуги</Link>
      <Link className='admin__link' to="/admin-panel/listservice">Услуги список</Link>
      <Link className='admin__link' to="/admin-panel/create-image">Загрузка Изображения</Link>
      <Link className='admin__link' to="/admin-panel/delete-image">Удаление Изображения</Link>
      <Link className='admin__link' to="/admin-panel/listproduct">Товары список</Link>
      <Link className='admin__link' to="/admin-panel/addproduct">Добавить товар</Link>
      <Link className='admin__link' to="/admin-panel/imagelist">Фото все</Link>
      <Link className='admin__link' to="/admin-panel/addnews">Добавить новость</Link>
      <Link className='admin__link' to="/admin-panel/listnews">Список новостей</Link>

      <div className='admin-links'>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin-panel/*" element={<PrivateRoute><AdminPanelRoute /></PrivateRoute>} />
          <Route path="addproduct" element={<Addproduct />} />
          <Route path="listproduct" element={<ListProduct />} />
          <Route path="listservice" element={<ListService />} />
          <Route path="create-image" element={<CreateImage />} />
          <Route path="delete-image" element={<DeleteImage />} />
          <Route path="create" element={<CreateServiceForm />} />
          <Route path="delete" element={<DeleteService />} />
          <Route path="update" element={<UpdateService />} />
          <Route path="imagelist" element={<ImageList />} />
          <Route path="addnews" element={<CreateNewsForm />} />
      <Route path="listnews" element={<ListNews />} />
          <Route path="update-news/:id" element={<UpdateNewsForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanelRoute;