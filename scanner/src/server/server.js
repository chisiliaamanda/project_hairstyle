require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel'); // Load face detection and feature extraction model
const { classifyFaceType, createHairstyleRecommendation } = require('../services/faceAndHairstyle'); // Face type classification and hairstyle recommendation
const InputError = require('../exceptions/InputError');

(async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'], // Adjust CORS settings as needed for your application
      },
    },
  });

  // Load the face detection and feature extraction model
  const model = await loadModel();
  server.app.model = model;

  // Register routes for image prediction and history retrieval
  server.route(routes);

  // Custom error handling middleware for InputError and Hapi Boom errors
  server.ext('onPreResponse', async function (request, h) {
    const response = request.response;

    if (response instanceof InputError) {
      const newResponse = h.response({
        status: 'fail',
        message: `${response.message}`,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      let message = response.message;

      if (response.output.statusCode === 413) {
        message = 'Payload content length greater than maximum allowed: 1000000';
      }

      const newResponse = h.response({
        status: 'fail',
        message: message,
      });
      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server started at: ${server.info.uri}`);
})();
