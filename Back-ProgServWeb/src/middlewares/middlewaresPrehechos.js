const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const { app } = require('../server');

//Middleware Logger
const logger = morgan('tiny');

function middlewares_Prehechos(app){
    app.use(express.json())

    app.use(cors({
    origin: 'http://localhost:4200'
}));

    app.use(logger)

//Middleware para registrar IP y Hora
app.use((req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] IP: ${req.ip} - ${req.method} ${req.originalUrl}`);
    next();
});
}

module.exports =  middlewares_Prehechos;
