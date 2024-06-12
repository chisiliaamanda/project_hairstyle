const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;  // Assuming user preferences are also sent
  const { model } = request.server.app;

  // Get the prediction from the model
  const { confidenceScore, label, suggestion } = await predictClassification(model, image);
  
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    hairstyle: label,
    suggestion: suggestion,
    confidenceScore: confidenceScore,
    createdAt: createdAt
  };
  
  // Store the prediction result in Cloud SQL
  await storeData.storePrediction(id, data);

  const response = h.response({
    status: 'success',
    message: confidenceScore > 0.85 ? 'Hairstyle recommendation generated successfully' : 'Hairstyle recommendation generated but with low confidence. Please provide a clearer image or more preferences.',
    data
  });
  response.code(201);
  return response;
}

async function getPredictHistoriesHandler(request, h) {
  const client = await pool.connect();
  try {
    const queryText = 'SELECT * FROM hairstyle_recommendations';
    const result = await client.query(queryText);

    const histories = result.rows.map(row => ({
      id: row.id,
      history: {
        hairstyle: row.hairstyle,
        suggestion: row.suggestion,
        confidenceScore: row.confidence_score,
        createdAt: row.created_at
      }
    }));

    return {
      status: 'success',
      data: histories
    };
  } catch (error) {
    console.error('Error retrieving hairstyle recommendation histories:', error.message);
    return {
      status: 'fail',
      message: 'Failed to retrieve hairstyle recommendation histories'
    };
  } finally {
    client.release();
  }
}

module.exports = { postPredictHandler, getPredictHistoriesHandler };