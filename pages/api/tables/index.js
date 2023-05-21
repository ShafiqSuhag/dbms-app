import mysql from 'mysql';
require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const dbConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
};

export default function handler(req, res) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).json({ error: 'Error connecting to the database' });
      return;
    }

    const query = 'SHOW TABLES';

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving tables:', error);
        res.status(500).json({ error: 'Error retrieving tables' });
      } else {
        const tables = results.map((row) => row[`Tables_in_${dbConfig.database}`]);
        res.json({ tables });
      }

      connection.end(); // Close the database connection
    });
  });
}
