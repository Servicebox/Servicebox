import React, { useState } from 'react';
import UpdateService from './UpdateService';
import DeleteService from './DeleteService';

const AdminPanel = () => {
  const [serviceId, setServiceId] = useState('');

  const handleServiceIdChange = (e) => {
    setServiceId(e.target.value);
  };

  return (
    <div>
      <h2>Управление услугами</h2>
      <UpdateService />
      <DeleteService serviceId={serviceId} />
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