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
