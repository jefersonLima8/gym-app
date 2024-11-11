const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const util = require('util');

// Configurações do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'J$ffLim@',
  database: 'GymAppDB'
});

// Middleware
app.use(cors());
app.use(express.json());  // Para permitir que o servidor lide com JSON no corpo das requisições

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = 'SELECT id, username FROM Users WHERE email = ? AND passwordHash = ?';
    const queryAsync = util.promisify(connection.query).bind(connection);

    const result = await queryAsync(query, [email, password]);
    if (result.length > 0) {
        res.status(200).json({ message: 'Usuário logado com sucesso!', userId: result });
    } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;

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

// Histórico de treino Endpoint
app.post('/user/:userId', async (req, res) => {
  const { id } = req.params;
  const { usuario, email} = req.body;
  try {
    const query = 'UPDATE users SET Username = ?, Email  = ? WHERE id = ?';
    const queryAsync = util.promisify(connection.query).bind(connection);
    const result = await queryAsync(query, [usuario, email, id]);
    if (result.affectedRows > 0) {
      res.status(200).json({message: 'Usuário atualizado com sucesso!'})
    } else {
      res.status(404).json({message: 'Usuário não encontrado'});
    }
  } catch (err){
    console.error('Error no put da edição de dados do usuario:', err);
    res.status(500).send('Erro');
  }
});

// Rota para obter os treinos de um usuário
app.post('/api/workouts/:userId', (req, res) => {
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
// @TODO Corrigir url da rota
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email} = req.body;
  console.log(res.body);
  const query = 'UPDATE users SET Username = ?, Email  = ? WHERE id = ?';
  connection.query(query, [username, email, id], (err, result) => {
    console.log('aqui');
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
    } else {
      res.status(400).json({ error: err.message });
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

// Histórico de treino
app.post('/api/workouthistory', (req, res) => {
  const { texto, user_id } = req.body;
  const query = 'INSERT INTO workouthistory (treino, user_id) VALUES (?, ?)';

  connection.query(query, [texto, user_id], (err, result) => {
    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Treino criado com sucesso!', postId: result.insertId });
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

//  Histórico de treino - atual
app.get('/api/workouthistory/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT texto FROM workouthistory WHERE user_id = ? ORDER BY id DESC LIMIT 1';

  connection.query(query, [user_id], (err, results) => {
    if (results.length > 0) {
      res.status(200).json(results);
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Nenhum treino encontrado.' });
    }
  });
});  


// Iniciar o servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
