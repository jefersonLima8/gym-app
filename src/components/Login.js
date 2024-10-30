import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logoApp from '../static/IA.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ authenticateUser }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para visibilidade da senha
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Chama a função authenticateUser e passa os parâmetros
      const userId = await authenticateUser(email, password);
      // Se a autenticação for bem-sucedida, redireciona para o Dashboard
      if (userId) {
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Usuário ou senha incorretos'); // Mensagem de erro padrão
      console.error('Erro ao realizar login:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logoApp} alt='Logo IaGym' className='login-logo' />
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'} // Alterna entre 'text' e 'password'
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        
        <button type="submit">Entrar</button>
        <p>
          Não tem uma conta? <Link to="/register">Cadastre-se aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
