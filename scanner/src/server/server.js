require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel'); // Load face detection and feature extraction model
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
  try {
    // Load the machine learning model
    const model = await loadModel();
    server.app.model = model; // Make the model available throughout the app

    // Register the routes
    server.route(routes);

    // Custom error handling
    server.ext('onPreResponse', (request, h) => {
      const response = request.response;

      if (response instanceof InputError) {
        const newResponse = h.response({
          status: 'fail',
          message: `${response.message}`
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
          message: message
        });
        newResponse.code(response.output.statusCode);
        return newResponse;
      }

      return h.continue;
    });

    // Start the server
    await server.start();
    console.log(`Server started at: ${server.info.uri}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the process with an error code
  }
})();
