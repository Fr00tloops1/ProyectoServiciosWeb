const express = require('express')
const cors = require('cors');


function middlewares_Prehechos(app){
    app.use(express.json());

    app.use(cors({
    origin: 'http://localhost:4200'
}));



}


module.exports =  middlewares_Prehechos 
