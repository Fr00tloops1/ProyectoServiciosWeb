const express = require('express');
const router = express.Router();
const answersController = require('../../../controllers/answersControllers');
const verifyToken = require('../../../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - content
 *         - questionId
 *       properties:
 *         content:
 *           type: string
 *           description: Contenido de la respuesta
 *         questionId:
 *           type: string
 *           description: ID de la pregunta a la que pertenece la respuesta
 */

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: API de gestión de respuestas
 */

/**
 * @swagger
 * /responder:
 *   post:
 *     summary: Crear una nueva respuesta
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       201:
 *         description: Respuesta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 respuesta:
 *                   $ref: '#/components/schemas/Answer'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post("/responder", verifyToken, answersController.createAnswer);

/**
 * @swagger
 * /respuesta/{id}:
 *   put:
 *     summary: Actualizar una respuesta
 *     tags: [Answers]
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
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       200:
 *         description: Respuesta actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 respuesta:
 *                   $ref: '#/components/schemas/Answer'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Respuesta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/respuesta/:id", verifyToken, answersController.updateAnswer);

/**
 * @swagger
 * /misrespuestas:
 *   get:
 *     summary: Obtener las respuestas del usuario autenticado
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de respuestas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 respuestas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Answer'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get("/misrespuestas", verifyToken, answersController.getUserAnswers);

/**
 * @swagger
 * /borrarrespuesta/{id}:
 *   delete:
 *     summary: Eliminar una respuesta
 *     tags: [Answers]
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
 *         description: Respuesta eliminada
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Respuesta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/borrarrespuesta/:id", verifyToken, answersController.deleteAnswer);

/**
 * @swagger
 * /respuestas/pregunta/{questionId}:
 *   get:
 *     summary: Obtener todas las respuestas de una pregunta específica
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta
 *     responses:
 *       200:
 *         description: Lista de respuestas de la pregunta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 respuestas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Answer'
 *       404:
 *         description: Pregunta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/respuestas/pregunta/:questionId", answersController.getAllAnswersByQuestion);

module.exports = router;
