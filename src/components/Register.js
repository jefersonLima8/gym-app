import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Register.css';
import logoApp from '../static/IA.png';
// Importando os ícones do Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Para a senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Para confirmar a senha
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      console.log("Cadastro realizado com sucesso: ", data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        showConfirmButton: false,
        timer: 3000
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError(error.message);
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <img
          src={logoApp}
          alt='Logo IaGym' 
          className='login-logo'
        />
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
        
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'} // Alterna entre 'text' e 'password'
            placeholder="Senha"
            value={passwordHash}
            required
            onChange={(e) => setPasswordHash(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        <div className="password-input-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'} // Alterna entre 'text' e 'password'
            placeholder="Confirmar Senha"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        <button type="submit">Cadastrar</button>
        <p>
          Já tem uma conta? <Link to="/login">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
