// pages/api/createTable.js

import mysql from 'mysql';

export default function createTableHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Retrieve the table name and columns from the request body
  const { tableName, columns } = req.body;
  require('dotenv').config();
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

  // Configure your MySQL connection
  const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  });

  // Connect to the MySQL server
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Create the table query
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT PRIMARY KEY AUTO_INCREMENT,
      ${columns
        .map(
          (column) =>
            `${column.name} ${column.type}${column.length ? `(${column.length})` : ''}${column.defaultValue ? ` DEFAULT '${column.defaultValue}'` : ''
            }`
        )
        .join(',\n')}
    )`;

    // Execute the create table query
    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Close the MySQL connection
      connection.end();

      // Return a success response
      res.status(200).json({ message: 'Table created successfully' });
    });
  });
}
