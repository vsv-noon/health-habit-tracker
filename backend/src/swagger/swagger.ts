import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PERN Project API',
      version: '1.0.0',
      description: 'API Documentation for the PERN stack project',
    },
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  // Path to the API docs (files containing @swagger or @openapi annotations)
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
