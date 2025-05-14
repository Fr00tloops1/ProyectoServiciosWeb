const express = require('express');
const router = express.Router();
const questionController = require('../../../controllers/questionControllers');
const verifyToken = require('../../../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la pregunta
 *         content:
 *           type: string
 *           description: Contenido de la pregunta
 *         userId:
 *           type: string
 *           description: ID del usuario que crea la pregunta
 */

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API de gestión de preguntas
 */

/**
 * @swagger
 * /CrearPreguntas:
 *   post:
 *     summary: Crear una nueva pregunta
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 pregunta:
 *                   $ref: '#/components/schemas/Question'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/CrearPreguntas', verifyToken, questionController.createQuestion);

/**
 * @swagger
 * /MostrarPreguntas:
 *   get:
 *     summary: Obtener todas las preguntas
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Lista de preguntas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 preguntas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *       500:
 *         description: Error del servidor
 */
router.get('/MostrarPreguntas', questionController.getQuestions);

/**
 * @swagger
 * /MostrarMisPreguntas:
 *   get:
 *     summary: Obtener las preguntas del usuario autenticado
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 preguntas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/MostrarMisPreguntas', verifyToken, questionController.getUserQuestions);

/**
 * @swagger
 * /EliminarPregunta/{id}:
 *   delete:
 *     summary: Eliminar una pregunta
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pregunta eliminada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.delete('/EliminarPregunta/:id', verifyToken, questionController.deleteQuestion);

/**
 * @swagger
 * /EditarPregunta/{id}:
 *   put:
 *     summary: Actualizar una pregunta
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Pregunta actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 pregunta:
 *                   $ref: '#/components/schemas/Question'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.put('/EditarPregunta/:id', verifyToken, questionController.updateQuestion);

module.exports = router;
