
import mysql from 'mysql';
require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;


export default async function handler(req, res) {
  const {  tableName } = req.query;
  console.log("test_101", tableName);
  

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Retrieve the table name and columns from the request body

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

   

    // Execute the create table query
    connection.query('DROP TABLE ??',[tableName], (err) => {
      if (err) {
        console.error('Error deleting table:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Close the MySQL connection
      connection.end();

      // Return a success response
      res.status(200).json({ message: 'Table successfully deleted' });
    });
  });
}
