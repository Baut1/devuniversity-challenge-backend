"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiServe = exports.swaggerUiSetup = exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.swaggerUiSetup = swagger_ui_express_1.default.setup(exports.swaggerSpec);
exports.swaggerUiServe = swagger_ui_express_1.default.serve;
