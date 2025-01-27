import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To do list API',
      version: '1.0.0',
      description: 'API for managing tasks in the To Do List application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique ID of the task',
            },
            title: {
              type: 'string',
              description: 'Title of the task',
            },
            completed: {
              type: 'boolean',
              description: 'Whether the task is completed',
            },
          },
        },
        NewTask: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the new task',
            },
          },
          required: ['title'],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
export const swaggerUiServe = swaggerUi.serve;
