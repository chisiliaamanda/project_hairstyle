const mysql = require('mysql2/promise');

async function storeData(id, data) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const query = 'INSERT INTO predictions (id, faceShape, confidenceScore, hairstyleImage, createdAt) VALUES (?, ?, ?, ?, ?)';
  const values = [id, data.faceShape, data.confidenceScore, data.hairstyleImage, data.createdAt];

  await connection.execute(query, values);
  await connection.end();
}

module.exports = storeData;
