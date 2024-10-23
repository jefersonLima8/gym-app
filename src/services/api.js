import axios from 'axios';

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const api = axios.create({
    apiURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const sendRequest = async (prompt) => {
    try {
        const response = await api.post(`/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ],

                }
            ],

        }
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao consultar a API', error);
        throw error;
    }
};

export default api;