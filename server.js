// server.js
const express = require('express');
const mysql = require('mysql');

const server = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'sohag',
  password: '1',
  database: 'dbms_app',
});

server.get('/api/tables', (req, res) => {
  pool.query('SHOW TABLES', (error, results) => {
    if (error) {
      console.error('Error retrieving tables:', error);
      res.status(500).json({ error: 'Error retrieving tables' });
    } else {
      const tables = results.map((row) => row[`Tables_in_${pool.config.database}`]);
      res.json({ tables });
    }
  });
});

server.post('/api/query', (req, res) => {
  const { query } = req.body;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error executing query' });
    } else {
      res.json({ results });
    }
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
