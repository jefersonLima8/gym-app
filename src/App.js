import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';

const API_GYM_BACK_END_URL = 'http://localhost:500/api/workouthistory';

  /**
 * Salva o histórico de treino de um usuário.
 *
 * Esta função faz uma requisição POST para a API de backend com o objetivo de 
 * salvar o texto do treino e associa com o usuario logado
 *
 * @param {string} texto - O texto contendo as informações do treino que serão salvas.
 * @param {string|number} user_id - O ID do usuário que está registrando o treino.
 * @returns {Promise<Object|null>} Retorna a resposta da requisição se for bem-sucedida, ou null em caso de erro.
 * PS: a variavel texto e user_id não podem mudar de nome ou vai dar erro no back-end
 * @throws {Error} Lança um erro se houver falha na requisição.
 */
export const setWoworkoutHistory = async (texto, user_id) => {
  try {
      const response =await axios.post(API_GYM_BACK_END_URL, { texto, user_id });
      if(response){
          return response;
      }
    
  } catch (error) {
    console.error('Erro ao salvar dados do treino', error);
    return null;
  }
};

/**
* Recupera o último treino do usuário.
*  usa o userId como parametro e busca o último treino do camarada
* @param {string|number} userId - O ID do usuário para o qual o treino será recuperado.
* @returns {Promise<string>} Retorna uma promessa que resolve para o texto do treino ou uma mensagem de erro.
*
* @throws {Error} Lança um erro se houver falha na requisição ou na resposta da API.
*/
export const getWorkoutHistory = async (userId) => {
  try {
      const response = await axios.get(`${API_GYM_BACK_END_URL}/${userId}`);
      if (response.data && response.status) {
          return response.data[0].texto;
      }
      return 'Não conseguimos encontrar seu treino';
  } catch (error) {
      console.error(`Erro ao buscar treino do usuario: ${userId}, error`);
  }
};

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