import React from 'react';
import { Link } from 'react-router-dom';
 import "./AdminPanelRoute.css"

const AdminPanelRoute = () => {
  return (
    <div className='admin'>
      <Link className='admin__link' to="/admin/create">Cоздание</Link>
      <Link className='admin__link' to="/admin/delete">Удаление</Link>
      <Link className='admin__link' to="/admin/update">Обновление</Link>
    </div>
  );
};

export default AdminPanelRoute;