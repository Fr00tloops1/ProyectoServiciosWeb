const express = require('express');
const sequelize = require('./config/database')
const app = express();
require('dotenv').config()

//Variable que contiene el puerto del servidor
const PORT = process.env.PORT || 3000;

//Variable que contiene el nombre de la Base de Datos
const dbName = process.env.DB_NAME;

//Uso de los middlewares:
app.use(express.json());

sequelize.sync()
    .then(() =>console.log(`La Base de Datos ${dbName} esta lista para usarse`))
    .catch(err =>console.log(err));

app.listen(PORT, ()=>{
    console.log(`El servidor MARTIN_REDES_OJOALEGRE esta corriendo en el puerto: ${PORT}`)
});

