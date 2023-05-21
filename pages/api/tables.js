import mysql from 'mysql';

const dbConfig = {
    host: 'localhost',
    user: 'sohag',
    password: '1',
    database: 'dbms_app',
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
