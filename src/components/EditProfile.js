import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';

const EditProfile = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Função para carregar dados do perfil do usuário, simulando uma chamada à API
  useEffect(() => {
    const loadUserProfile = async () => {
      // Exemplo de dados do usuário; substitua pelo real quando houver API
      const userData = { name: 'Usuario', email: 'usuario@exemplo.com' };
      setName(userData.name);
      setEmail(userData.email);
    };

    loadUserProfile();
  }, []);

  // Função para salvar alterações no perfil do usuário
  const handleSave = async () => {
    try {
      // Simulação de atualização da API
      console.log('Salvando perfil:', { name, email });
      setSuccessMessage('Perfil atualizado com sucesso!');
      
      // Redireciona após alguns segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Editar Perfil</h2>
      <div className="input-group">
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
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
