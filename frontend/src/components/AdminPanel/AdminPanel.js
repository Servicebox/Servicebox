import React, { useState } from 'react';
import './AdminPanel.css'

import AdminPanelRoute from './AdminPanelRoute/AdminPanelRoute';

const AdminPanel = () => {
  const [serviceId, setServiceId] = useState('');


  return (
    <div className='admim-panel__root'>
      <aside className="admin-sidebar">
        <h2>Управление услугами</h2>
        <AdminPanelRoute isSidebar={true} />
      </aside>
      <main className="admin-content">
      </main>
    </div>
  );
};

export default AdminPanel;