import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
 import "./AdminPanelRoute.css"
 import CreateImage from '../Image/CreateImage'; 
 import CreateServiceForm from './CreateServiceForm';
import DeleteService from './DeleteService';
import UpdateService from './UpdateService';
import DeleteImage from '../Image/DeleteImage';

const AdminPanelRoute = () => {
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Отправка запроса на загрузку товара
  }
  return (
    <div className='admin'>

      <Link className='admin__link' to="/admin/create">Cоздание</Link>
      <Link className='admin__link' to="/admin/delete">Удаление</Link>
      <Link className='admin__link' to="/admin/update">Обновление</Link>
      <Link className='admin__link' to="/admin/create-image">Загрузка Изображения</Link>
      <Link className='admin__link' to="/admin/delete-image">Удаление Изображения</Link>
  
      <Routes>
        <Route path="create-image" element={<CreateImage />} />
        <Route path="delete-image" element={<DeleteImage />} />
        <Route path="create" element={<CreateServiceForm />} />
        <Route path="delete" element={<DeleteService />} />
        <Route path="update" element={<UpdateService />} />
    
      </Routes>
    </div>
  );
};

export default AdminPanelRoute;