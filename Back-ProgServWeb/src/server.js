const app = require('./app');
require('dotenv').config();

// Variable que contiene el puerto del servidor:
const PORT = process.env.PORT || 8001;

// Iniciar el servidor
const server = app.listen(PORT, () => {
    console.log(`El servidor del proyecto esta corriendo en el puerto: ${PORT}`);
});

// Exportar el servidor para posibles pruebas
module.exports = server;