const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',       // Ou o IP do servidor MySQL
  user: 'root',            // Usuário do banco de dados
  password: 'J$ffLim@',   // Senha do MySQL
  database: 'GymAppDB'     // Nome do banco de dados que criamos
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

module.exports = connection;
