const express = require('express');
const router = express.Router();
const createQService = require('../../../services/questions/auth');
const { status } = require('http-status');

router.post("/createQ", async(req,res) =>{
    try{
        const question = await createQService.createQ(req,res);
        return res.status(201).json(question);
    }
    catch(exception) {
        return res.status(500);
    }
});