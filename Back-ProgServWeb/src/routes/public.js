const express = require('express');
const router = express.Router();
require('dotenv').config();

// Rutas de autenticación
const authRouter = require('./api/user/auth');
router.use('/api', authRouter);

// Rutas de preguntas
const questionRouter = require('./api/question/questions');
router.use('/api', questionRouter);

// Rutas de comments
const commentsRouter = require('./api/comments/commentsRoutes');
router.use('/api', commentsRouter);

// Rutas de respuestas
const answersRouter = require('./api/answers/answersroutes');
router.use('/api', answersRouter);

module.exports = router; 