// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem('authToken'); // Exemplo: verificando se existe um token
const isAuthenticated = '12345';

//   return isAuthenticated ? children : <Navigate to="/login" />;
return isAuthenticated ? children : children;
};

export default PrivateRoute;
