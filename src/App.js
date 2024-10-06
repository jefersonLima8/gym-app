import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      setUserId(response.data.userId);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro ao autenticar o usuário:', error);
      alert('Credenciais inválidas!');
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username,
        email,
        passwordHash: password,
      });
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login authenticateUser={authenticateUser} />}
        />
        <Route
          path="/register"
          element={<Register registerUser={registerUser} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard userId={userId} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;