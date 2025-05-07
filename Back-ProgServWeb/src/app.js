const express = require('express');
const sequelize = require('./config/database')
const routes = require('./routes/index');
const sanitizeInput = require('./middlewares/SanitizeInput');
const helmet = require('helmet');
require('dotenv').config()
require('./models/user');
require('./models/question');
require('./models/answerq');
require('./models/comments');
const associateModels = require('./models/associatemodels');
associateModels();
const cors = require('cors');
const morgan = require('morgan');

//Middleware Logger
const logger = morgan('tiny');

const swaggerUi = require('swagger-ui-express');
const specs = require('../swagger/swagger.js');

// Crear la aplicación Express
const app = express();

app.use(logger);
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(sanitizeInput);
app.use(helmet());
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100
});
app.use(limiter);

// Rutas públicas
app.use(routes.unprotectedRoutes);

// Configuración de Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Rutas protegidas
app.use('/api', routes.protectedRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        mensaje: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Sincronizar la base de datos solo si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    sequelize.sync({ alter: true })
        .then(() => {
            console.log('Base de datos sincronizada');
        })
        .catch(err => {
            console.error('Error al sincronizar la base de datos:', err);
        });
}

module.exports = app;