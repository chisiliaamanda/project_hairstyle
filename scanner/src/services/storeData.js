const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

const storePrediction = async (id, data) => {
    const client = await pool.connect();
    try {
        const queryText = `INSERT INTO hairstyle_recommendations (id, hairstyle, suggestion, confidence_score, created_at)
                           VALUES ($1, $2, $3, $4, $5)`;
        const values = [id, data.hairstyle, data.suggestion, data.confidenceScore, data.createdAt];
        await client.query(queryText, values);
    } catch (err) {
        console.error('Error storing hairstyle recommendation:', err);
    } finally {
        client.release();
    }
};

module.exports = {
    storePrediction
};