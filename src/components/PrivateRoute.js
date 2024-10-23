// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Exemplo: verificando se existe um token

  return isAuthenticated ? children : children;
};

export default PrivateRoute;
