const swaggerJSDoc = require('swagger-jsdoc');

//definition of the API spec
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pipe Leakage API',
      version: '1.0.0',
      description: `The API documentation UI is a sample documentation UI developed by Mabuela Ngulube for DigiCert as part of a job application. 
         The API documentation was developed using Express.JS and Swagger and JSDocs third-party libraries.`,
    },
    servers: [
      {
        url: 'https://water-leakage-v2.vercel.app',
      },
    ],
  },
  apis: ['./*.js'],
};

exports.specs = swaggerJSDoc(options);
