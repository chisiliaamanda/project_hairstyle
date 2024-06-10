const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const { Firestore } = require('@google-cloud/firestore');
const { createHairstyleRecommendation } = require('../services/hairstyleRecommendation');

async function postPredictHandler(request, h) {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { faces, features } = await predictClassification(model, image);

    if (faces.length === 0) {
      return h.response({
        status: 'fail',
        message: 'No faces detected in the image. Please try again.',
      }).code(400);
    }

    const facialFeatures = {
        face,
        shape,
        length,
        width
    };

    const hairstyleRecommendation = createHairstyleRecommendation(facialFeatures);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id,
      result: hairstyleRecommendation, // Recommendation from model
      features, // Extracted facial features for potential future use
      createdAt,
    };

    await storeData(id, data); // Store prediction data securely

    const response = h.response({
      status: 'success',
      message: 'Hairstyle recommendation generated successfully.',
      data: {
        recommendation: hairstyleRecommendation, // Only provide the recommendation
      },
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error('Error generating hairstyle recommendation:', error.message);
    return h.response({
      status: 'fail',
      message: 'Failed to generate hairstyle recommendation.',
    }).code(500);
  }
}

async function getPredictHistoriesHandler(request, h) {
    try {
      const db = new Firestore();
  
      const predictCollection = db.collection('predictions');
      const snapshot = await predictCollection.get();
  
      const histories = [];
      snapshot.forEach(doc => {
        histories.push({
          id: doc.id,
          history: doc.data()
        });
      });
  
      return {
        status: 'success',
        data: histories
      };
    } catch (error) {
      console.error('Error retrieving prediction histories:', error.message);
      return {
        status: 'fail',
        message: 'Failed to retrieve prediction histories'
      };
    }
  }

module.exports = { postPredictHandler, getPredictHistoriesHandler };
















// async function postPredictHandler(request, h) {
//     const { image } = request.payload;
//     const { model } = request.server.app;
  
//     // const { confidenceScore, label, suggestion } = await predictClassification(model, image);
//     const id = crypto.randomUUID();
//     // const createdAt = new Date().toISOString();
  
//     const data = {
//       "id": id,
//       "headType": label,
//       "hairType": suggestion,
//       "recommendation": recommendation,
//       "confidenceScore": confidenceScore 
//     }
    
//     // await storeData(id, data);
  
//     const response = h.response({
//       status: 'success',
//       message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
//       data
//     })
//     response.code(201);
//     return response;
//   }