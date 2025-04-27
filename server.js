const express = require('express');
const sequelize = require('./config/database')
const routes = require('./routes/index');
const app = express();
require('dotenv').config()
const userModel = require('./models/user')
const questionModel = require('./models/question')
const myAnswerModel = require('./models/myAnswer')
const commentsModel = require('./models/comments')

//Variable que contiene el puerto del servidor:
const PORT = process.env.PORT || 3000;

//Variable que contiene el nombre de la Base de Datos:
const dbName = process.env.DB_NAME;

//Sincronizacion de los modelos de las tablas:

    
//Uso de los middlewares:
app.use(express.json());

sequelize.sync()
    .then(() =>console.log(`La Base de Datos ${dbName} esta lista para usarse`))
    .catch(err =>console.log(err));

app.listen(PORT, ()=>{
    console.log(`El servidor MARTIN_REDES_OJOALEGRE esta corriendo en el puerto: ${PORT}`)
});

app.use(routes.unprotectedRoutes);