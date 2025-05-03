
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation FreeHands',
        },
        server: [
        {
            url: 'http://localhost:8001',
            description: 'Development server',
        },
        ],
    },
    apis: ['./src/routes/**/*.js'], 

};

const specs = swaggerJSDoc(options);
module.exports = specs;