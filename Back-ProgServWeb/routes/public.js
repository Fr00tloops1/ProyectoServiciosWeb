const express = require('express');
const router = express.Router();
require('dotenv').config();

const authRouter = require('./api/user/auth');
router.use( process.env.BASE_URL, authRouter);

const questionRouter = require('./api/question/auth');
router.use(process.env.BASE_URL, questionRouter);



module.exports = router; 