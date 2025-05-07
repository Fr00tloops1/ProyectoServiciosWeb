const express = require('express');
const router = express.Router();
require('dotenv').config();

// Rutas de autenticación
const authRouter = require('./api/user/auth');
router.use(process.env.BASE_URL, authRouter);

// Rutas de preguntas
const questionRouter = require('./api/question/questions');
router.use(process.env.BASE_URL, questionRouter);

// Rutas de comments
const commentsRouter = require('./api/comments/commentsRoutes');
router.use(process.env.BASE_URL, commentsRouter);

// Rutas de respuestas
const answersRouter = require('./api/answers/answersroutes');
router.use(process.env.BASE_URL, answersRouter);

module.exports = router; 