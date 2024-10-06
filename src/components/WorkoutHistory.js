import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Importar o axios para fazer requisições HTTP

const WorkoutHistory = ({ userId }) => {
  const [workouts, setWorkouts] = useState([]);

  // Função para buscar os treinos do usuário
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/workouts/${userId}`);
      setWorkouts(response.data);
    } catch (error) {
      console.error('Erro ao buscar os treinos:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWorkouts();
    }
  }, [userId]);

  return (
    <div>
      <h2>Histórico de Treinos</h2>
      <ul>
        {workouts.map(workout => (
          <li key={workout.Id}>
            {workout.Exercise}: {workout.Reps} reps, {workout.Sets} sets (Data: {workout.Date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutHistory;

