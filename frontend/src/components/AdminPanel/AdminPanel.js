import React, { useState } from 'react';
import './AdminPanel.css'

import AdminPanelRoute from './AdminPanelRoute/AdminPanelRoute';

const AdminPanel = () => {
  const [serviceId, setServiceId] = useState('');

  const handleServiceIdChange = (e) => {
    setServiceId(e.target.value);
  };

  return (
    <div className='admim-panel__root'>
      <h2>Управление услугами</h2>
      <AdminPanelRoute />

      
      <input 
        type="text" 
        value={serviceId} 
        onChange={handleServiceIdChange} 
        placeholder="ID услуги" 
      />
    </div>
  );
};

export default AdminPanel;