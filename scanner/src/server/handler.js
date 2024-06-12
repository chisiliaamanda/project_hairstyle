const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getPredictHistories = require('../services/getPredictionHistories');

async function postPredictHandler(request, h) {
  const { image } = request.payload;  // Assuming user preferences are also sent
  const { model } = request.server.app;

  // Get the prediction from the model
  const { confidenceScore, label, faceShape, hairstyleImage } = await predictClassification(model, image);
  
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    faceShape,
    confidenceScore,
    hairstyleImage,
    createdAt
  };
  
  // Store the prediction result in Cloud SQL
  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
    data
  });
  response.code(201);
  return response;
}

async function getPredictHistoriesHandler(request, h) {
  try {
    const histories = await getPredictHistories();
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
  }
}

module.exports = { postPredictHandler, getPredictHistoriesHandler };