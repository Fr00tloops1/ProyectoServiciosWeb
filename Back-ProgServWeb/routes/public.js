const express = require('express');
const router = express.Router();
require('dotenv').config();

const authRouter = require('./api/user/auth');
router.use( process.env.BASE_URL, authRouter);

const questionRouter = require('./api/question/auth');
router.use(process.env.BASE_URL, questionRouter);

const commentsRouter = require('./api/comments/commentsRoutes');
router.use( process.env.BASE_URL, commentsRouter);


module.exports = router; 