import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAuth();

  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;

};

export default PrivateRoute;