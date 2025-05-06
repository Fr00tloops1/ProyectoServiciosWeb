const express = require('express');
const sequelize = require('./config/database');
const routes = require('./routes/index');
const middlewares_Prehechos = require('./middlewares/middlewaresPrehechos');
const swaggerUi = require('swagger-ui-express');
const specs = require('../swagger/swagger.js');

require('dotenv').config();

// Crear la aplicación Express
const app = express();

// Uso de Middlewares
middlewares_Prehechos(app);

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