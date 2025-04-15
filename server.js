const express = require('express');
const app = express();
require('dotenv').config()

//Variable que contiene el puerto del servidor
const PORT = process.env.PORT || 3000

//Uso de los middlewares:
app.use(express.json());


app.listen(PORT, ()=>{
    console.log(`El servidor MARTIN_REDES_OJOALEGRE esta corriendo en el puerto: ${PORT}`)
});

