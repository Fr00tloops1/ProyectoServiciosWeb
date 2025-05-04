const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

//Middleware Logger
const logger = morgan('tiny');

function middlewares_Prehechos(app){
    app.use(express.json())

    app.use(cors({
    origin: 'http://localhost:4200'
}));

    app.use(logger)

}


module.exports =  middlewares_Prehechos 
