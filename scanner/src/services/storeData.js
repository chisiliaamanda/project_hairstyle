const { Pool } = require('mysql2/promise'); // Assuming you're using MySQL for Cloud SQL

// Replace with your Cloud SQL connection details
const connectionConfig = {
  host: 'your-cloud-sql-instance-hostname',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
};

async function storeData(data) {
  const pool = await connectToCloudSql();
  const query = `INSERT INTO predictions (id, data, created_at) VALUES (?, ?, ?)`;

  try {
    const [results] = await pool.execute(query, [data.id, JSON.stringify(data), data.createdAt]);
    return results;
  } catch (error) {
    console.error('Error storing data in Cloud SQL:', error.message);
    throw new Error('Failed to store prediction data.');
  } finally {
    // Close the connection pool (optional, but recommended for production)
    pool.end();
  }
}

async function connectToCloudSql() {
  try {
    const pool = new Pool(connectionConfig);
    return pool;
  } catch (error) {
    console.error('Error connecting to Cloud SQL:', error.message);
    throw new Error('Failed to connect to database.');
  }
}

module.exports = storeData;