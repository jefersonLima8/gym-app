import axios from 'axios';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta';
const API_KEY = 'AIzaSyC14T71CM2zfd8jesGM8WUFnZs0pkyxr5I';
const API_GYM_BACK_END_URL = 'http://localhost:5000/api/workouthistory';

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
export const setWorkoutHistoryAPI = async (texto, user_id) => {
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
      if (response.data && response.status === 200) {
          return response.data[0].treino;
      }
      return 'Não conseguimos encontrar seu treino';
  } catch (error) {
      console.error(`Erro ao buscar treino do usuario: ${userId}, error`);
  }
};

export { sendRequest };