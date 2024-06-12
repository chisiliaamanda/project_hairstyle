const mysql = require('mysql2/promise');

async function getPredictionHistories() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const [rows] = await connection.execute('SELECT * FROM predictions');
  await connection.end();

  return rows;
}

module.exports = getPredictionHistories;
