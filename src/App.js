import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      setUserId(response.data.userId);
      setIsAuthenticated(true);
      return response.data.userId; // Retorna o userId para o login
    } catch (error) {
      console.error('Erro ao autenticar o usuário:', error);
      alert('Credenciais inválidas!'); // Erro se as credenciais não forem válidas
      return null; // Em caso de falhas
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username,
        email,
        passwordHash: password,
      });
      console.log(response); // Usando variável para log
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
        <Route path="/EditProfile" element={<EditProfile userId={userId} />} />
      </Routes>
    </Router>
  );
};

export default App;