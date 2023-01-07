const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Water Leakage API',
      version: '1.0.0',
      description: 'A simple express library',
    },
    servers: [
      {
        url: 'http://localhost:9000/',
      },
    ],
  },
  apis: ['../routes/*.js'],
};

exports.specs = swaggerJSDoc(options);
