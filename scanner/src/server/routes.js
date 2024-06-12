const { postPredictHandler, getPredictHistoriesHandler } = require('../server/handler'); // Import handlers

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data', // Allow for image upload
        multipart: true,
        output: 'data',  // This ensures the payload is parsed and available as a buffer
        parse: true,
        maxBytes: 10485760,  // Set a limit for the uploaded file size (e.g., 10MB)
      },
    },
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getPredictHistoriesHandler,
  },
];

module.exports = routes;
