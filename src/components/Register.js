import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordHash !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, passwordHash }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }

      const data = await response.json();
      // Aqui você pode redirecionar ou exibir uma mensagem de sucesso
      // console.log('Cadastro realizado com sucesso:', data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      setError(error.message);
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registrar</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={passwordHash}
          required
          onChange={(e) => setPasswordHash(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
        <p>
          Já tem uma conta? <Link to="/login">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
