const express = require('express');
const sequelize = require('./config/database')
const routes = require('./routes/index');
const middlewares_Prehechos = require('./middlewares/middlewares')
const app = express()
const swaggerUi = require('swagger-ui-express');
const specs = require('../swagger/swagger.js');

require('dotenv').config()

//Variable que contiene el puerto del servidor:
const PORT = process.env.PORT || 8001;

//Variable que contiene el nombre de la Base de Datos:
const dbName = process.env.DB_NAME;
    
//Uso de los middlewares:
middlewares_Prehechos(app);

app.use(routes.unprotectedRoutes);
sequelize.sync()
    .then(() =>console.log(`La Base de Datos ${dbName} esta lista para usarse`))
    .catch(err =>console.log(err));

//Configuracion de la documentacion de la API:
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, ()=>{
    console.log(`El servidor del proyecto esta corriendo en el puerto: ${PORT}`)
});


module.exports = {app}