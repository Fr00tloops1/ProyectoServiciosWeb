
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'API Documentation ASK IT',
        version: '1.0.0',
        description: 'API documentation ASK IT',
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