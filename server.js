const express = require('express');
const sequelize = require('./config/database')
const routes = require('./routes/index');
const app = express();
require('dotenv').config()
const userModel = require('../API/models/user')
const questionModel = require('../API/models/question')
const myAnswerModel = require('../API/models/myAnswer')
const commentsModel = require('../API/models/comments')

//Variable que contiene el puerto del servidor:
const PORT = process.env.PORT || 3000;

//Variable que contiene el nombre de la Base de Datos:
const dbName = process.env.DB_NAME;

//Sincronizacion de los modelos de las tablas:
 (async () => {
    userModel.sync({alter: true});
    questionModel.sync({alter: true});
    myAnswerModel.sync({alter: true});
    commentsModel.sync({alter: true});
 })
    
//Uso de los middlewares:
app.use(express.json());

sequelize.sync()
    .then(() =>console.log(`La Base de Datos ${dbName} esta lista para usarse`))
    .catch(err =>console.log(err));

app.listen(PORT, ()=>{
    console.log(`El servidor MARTIN_REDES_OJOALEGRE esta corriendo en el puerto: ${PORT}`)
});

app.use(routes.unprotectedRoutes);