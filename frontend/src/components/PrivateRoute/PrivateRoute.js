// src/PrivateRoute/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;