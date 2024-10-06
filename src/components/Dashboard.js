import React from 'react';

const Dashboard = ({ userId }) => {
  return (
    <div>
      <h1>Bem-vindo ao seu painel!</h1>
      <p>Usuário ID: {userId}</p>
      {/* Aqui você pode adicionar mais funcionalidades, como mostrar treinos ou estatísticas */}
    </div>
  );
};

export default Dashboard;
