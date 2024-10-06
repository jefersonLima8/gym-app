import React, { useState } from 'react';
import axios from 'axios';

const WorkoutTips = () => {
  const [tips, setTips] = useState('');

  const fetchTips = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tips');
      setTips(response.data.tips);
    } catch (error) {
      console.error('Error fetching tips:', error);
    }
  };

  return (
    <div>
      <h2>Workout Tips</h2>
      <button onClick={fetchTips}>Get Tips</button>
      <p>{tips}</p>
    </div>
  );
};

export default WorkoutTips;
