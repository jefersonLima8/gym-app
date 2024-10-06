const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await sql.query`SELECT * FROM Users WHERE Email = ${email} AND Password = ${password}`;
    if (result.recordset.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

// Register endpoint
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const result = await sql.query`INSERT INTO Users (Name, Email, Password) VALUES (${name}, ${email}, ${password})`;
      res.status(201).send('User registered successfully');
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  // Get workouts by user ID
router.get('/workouts/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await sql.query`SELECT * FROM Workouts WHERE UserId = ${userId}`;
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  const axios = require('axios');

// Get workout tips
router.get('/tips', async (req, res) => {
  try {
    const response = await axios.get('https://api.exemplo.com/tips'); // Altere para a sua API
    res.status(200).json(response.data);
  } catch (err) {
    console.error('Error fetching tips:', err);
    res.status(500).send('Internal Server Error');
  }
});
