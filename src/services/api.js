import axios from 'axios';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta';
const API_KEY = 'AIzaSyC14T71CM2zfd8jesGM8WUFnZs0pkyxr5I';

const api = axios.create({
    apiURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const sendRequest = async (prompt) => {
    try {
        const requestUrl = `${API_URL}/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        const response = await api.post(requestUrl, {
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

export { sendRequest };