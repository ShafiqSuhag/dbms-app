const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USER, // Database user
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_DATABASE, // Database name
  connectionLimit: 10, // Number of connections in the pool
});

// Export a query function to execute SQL queries
module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        connection.query(sql, values, (error, results) => {
          connection.release();

          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    });
  },
};
