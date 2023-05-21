import mysql from 'mysql';

const dbConfig = {
    host: 'localhost',
    user: 'sohag',
    password: '1',
    database: 'dbms_app',
};

export default function handler(req, res) {
  const { tableName } = req.query;

  if (!tableName) {
    res.status(400).json({ error: 'Table name is required' });
    return;
  }

  const connection = mysql.createConnection(dbConfig);

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).json({ error: 'Error connecting to the database' });
      return;
    }

    const query = `DESCRIBE ${tableName}`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error describing table:', error);
        res.status(500).json({ error: 'Error describing table' });
      } else {
        const tableDetails = results.map((row) => ({
          Field: row.Field,
          Type: row.Type,
          Null: row.Null,
          Key: row.Key,
          Default: row.Default,
          Extra: row.Extra,
        }));
        res.json({ tableDetails });
      }

      connection.end(); // Close the database connection
    });
  });
}
