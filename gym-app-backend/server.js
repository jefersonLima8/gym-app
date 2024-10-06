const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

// Configurações do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'GymAppDB'
});

// Middleware
app.use(cors());
app.use(express.json());  // Para permitir que o servidor lide com JSON no corpo das requisições

// Rota para adicionar um novo usuário
app.post('/api/users', (req, res) => {
  const { username, email, passwordHash } = req.body;
  const query = 'INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)';
  connection.query(query, [username, email, passwordHash], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Usuário criado com sucesso!', userId: result.insertId });
    }
  });
});

// Rota para obter os treinos de um usuário
app.get('/api/workouts/:userId', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM Workouts WHERE UserId = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para atualizar um treino
app.put('/api/workouts/:id', (req, res) => {
  const { id } = req.params;
  const { exercise, reps, sets } = req.body;
  const query = 'UPDATE Workouts SET Exercise = ?, Reps = ?, Sets = ? WHERE Id = ?';
  connection.query(query, [exercise, reps, sets, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Treino atualizado com sucesso!' });
    }
  });
});

// Rota para deletar um treino
app.delete('/api/workouts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Workouts WHERE Id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Treino excluído com sucesso!' });
    }
  });
});

// Iniciar o servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
