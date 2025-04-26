// src/PrivateRoute/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('auth-token');
  const role = localStorage.getItem('role');
  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
}

export default AdminRoute;