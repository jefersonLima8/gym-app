import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/EditProfile.css';

const EditProfile = () => {
  const location = useLocation();
  // const { userId } = location.state.paramsUserId;
  const userId = 22;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Função para carregar dados do perfil do usuário, simulando uma chamada à API
  useEffect(() => {
    const loadUserProfile = async () => {
      // Exemplo de dados do usuário; substitua pelo real quando houver API
      const userData = { name: '', email: '' };
      setName(userData.name);
      setEmail(userData.email);
    };

    loadUserProfile();
  }, []);

  // Função para salvar alterações no perfil do usuário
  const handleSave = async () => {
    try {
      const username = name;
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, {
        username,
        email,
      });

      if (response.status === 200) {
        setSuccessMessage('Perfil atualizado com sucesso!');
        setTimeout(() => {
          const data = [
            { id: userId },
          ];
          navigate('/dashboard', { state: { data } });
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setSuccessMessage('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Editar Perfil</h2>
      <div className="input-group">
        <label>Nome:</label>
        <input
          type="text"
          placeholder='Usuario'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>E-mail:</label>
        <input
          type="email"
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Salvar Alterações</button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default EditProfile;
