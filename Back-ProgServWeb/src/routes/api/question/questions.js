const express = require('express');
const router = express.Router();
const questionService = require('../../../services/questions/auth');
const { status } = require('http-status');


router.post("/CrearPreguntas", async(req,res) =>{
    try{
        const question = await questionService.createQ(req,res);
        return res.status(201).json(question);
    }
    catch(exception){
        return res.status(500);
    }
});


router.get("/MostrarPreguntas", async(req, res) =>{
    try{
        const question = await questionService.readQ(req, res);
        return res.status(201).json(question);
    }
    catch(exception){
        return res.status(500)
    }
});


 
router.get("/EliminarPregunta", async(req, res) =>{
    try{
        const question = await questionService.deleteQ(req, res);
        return res.status(201).json(question);
    }
    catch(exception){
        return res.status(500)
    }
});


router.get("/EditarPregunta", async(req, res) =>{
    try{
        const question = await questionService.updateQ(req, res);
        return res.status(201).json(question);
    }
    catch(exception){
        return res.status(500)
    }
});

module.exports = router;
