import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { sendRequest } from '../services/api.js';
import logoApp from '../static/IA.png';
import '../styles/Dashboard.css';

const Dashboard = ({ userId }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const formatResponse = (responseText) => {
    const formattedText = responseText
      .replace(/##/g, '')
      .replace(/\*\*/g, '')
      .replace(/\n/g, '<br />')
      .replace(/([a-zA-Z]):/g, '$1: ')
      .replace(/(\d)([a-zA-Z])/g, '$1 $2')
      .replace(/<br \/><br \/>/g, '</p><p>')
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(/<\/li><br \/>/g, '</li>')
      .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
      .replace(/^(Dia \d+|Dicas|Observação|Aquecimento|Resfriamento)/gm, '<strong>$1</strong>')
      .trim();

    return `<p>${formattedText}</p>`;
  };

  const fetchResponse = async () => {
    if (!question) return;

    setLoading(true);
    setError('');

    try {
      const res = await sendRequest(question);
      if (
        res.candidates &&
        Array.isArray(res.candidates) &&
        res.candidates.length > 0 &&
        res.candidates[0].content &&
        res.candidates[0].content.parts &&
        Array.isArray(res.candidates[0].content.parts) &&
        res.candidates[0].content.parts.length > 0
      ) {
        const rawResponse = res.candidates[0].content.parts[0].text;
        const formattedResponse = formatResponse(rawResponse);
        setResponse(formattedResponse);
      } else {
        console.warn('Estrutura de resposta inesperada:', res);
        setResponse('Resposta não encontrada.');
      }
    } catch (err) {
      setError('Erro ao buscar a resposta. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <img src={logoApp} alt='Logo IaGym' className='login-logo' />
      <p className="welcome-text">Olá USUARIO, seja bem-vindo ao IAGYM</p>
      
      <div className="settings-container">
        <FontAwesomeIcon
          icon={faCog}
          className="settings-icon"
          onClick={() => setShowSettings(!showSettings)}
        />
        {showSettings && (
          <div className="settings-menu">
            <ul>
              <li onClick={() => navigate('/EditProfile')}>Editar Perfil</li>
              <li onClick={handleLogout}>Sair</li>
            </ul>
          </div>
        )}
      </div>

      <div className="last-workout">
        <h2>Seu último treino</h2>
      </div>
      <p className="request-text">
        Solicite seu próximo treino - {new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </p>
      <div className='input-container'>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Solicite seu treino..."
        />
        <button onClick={fetchResponse} disabled={loading}>
          {loading ? 'Carregando...' : 'Enviar Pergunta'}
        </button>
      </div>
      <div className="response-container">
        {loading ? 'Carregando...' : ''}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div dangerouslySetInnerHTML={{ __html: response }} />
      </div>
    </div>
  );
};

export default Dashboard;
