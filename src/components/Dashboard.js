import React, { useState } from 'react';
import sendRequest from '../services/api.js'; // Importe a função sendRequest do arquivo api.js

const Dashboard = ({ userId }) => {
    const [question, setQuestion] = useState(''); // Estado para a pergunta
    const [response, setResponse] = useState(''); // Estado para a resposta
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchResponse = async () => {
        if (!question) return; // Não faz nada se a pergunta estiver vazia

        setLoading(true);
        setError('');
        
        try {
            const res = await sendRequest(question); // Usa a pergunta do input
            setResponse(res.choices[0].message.content); // Ajuste conforme a estrutura da resposta
        } catch (err) {
            setError('Erro ao buscar a resposta. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Bem-vindo ao seu painel!</h1>
            <p>Usuário ID: {userId}</p>
            <input 
                type="text" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                placeholder="Faça sua pergunta..."
            />
            <button onClick={fetchResponse} disabled={loading}>
                {loading ? 'Carregando...' : 'Enviar Pergunta'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>{response}</p>
            {/* Aqui você pode adicionar mais funcionalidades, como mostrar treinos ou estatísticas */}
        </div>
    );
};

export default Dashboard;
