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
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100
});
app.use(limiter);
// Rutas no protegidas
app.use(routes.unprotectedRoutes);

// Configuración de Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


if (process.env.NODE_ENV !== 'test') {
    sequelize.sync()
        .then(() => console.log(`La Base de Datos ${process.env.DB_NAME} esta lista para usarse`))
        .catch(err => console.log(err));
}

module.exports = app;