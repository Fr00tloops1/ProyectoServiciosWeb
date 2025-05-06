const express = require('express');
const router = express.Router();
const commentsControllers = require('../../../controllers/commentsControllers');
const { status } = require('http-status');
const { body, param } = require('express-validator');
const commentsController = new commentsControllers();
const commentsService = require('../../../services/comments/comments.js');
const validateFields = require('../../../middlewares/validateFields.js');

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints para gestionar comentarios
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answersqID:
 *                 type: string
 *                 example: "1"
 *               myAnswersID:
 *                 type: string
 *                 example: "1"
 *               comment:
 *                 type: string
 *                 example: "Este es un comentario"
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *       400:
 *         description: Campos obligatorios faltantes
 *       500:
 *         description: Error interno del servidor
 */
router.post("/comments",
    body(["answersID", "myAnswersID"]).notEmpty(),
    body("comment").notEmpty().isString().isLength({ min: 1, max: 140 }),
    validateFields,
    commentsController.createComment
);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Actualizar un comentario por ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "Comentario actualizado"
 *     responses:
 *       200:
 *         description: Comentario actualizado
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/comments/:id",
    param("id").notEmpty(),
    body("comment").notEmpty().isString().isLength({ min: 1, max: 140 }),
    validateFields,
    async (req, res) => {
        try {
            const commentUpdated = await commentsService.updateComment(req, res);
            return res.status(status.OK).json({ message: 'Comentario actualizado', comment: commentUpdated });
        } catch (exception) {
            return res.status(500).json({ error: exception.message });
        }
    }
);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Obtener todos los comentarios
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *       500:
 *         description: Error interno del servidor
 */
router.get("/comments", async (req, res) => {
    try {
        const comments = await commentsService.getComments(req, res);
        return res.status(status.OK).json(comments);
    } catch (exception) {
        return res.status(500).json({ error: exception.message });
    }
});

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Obtener un comentario por ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/comments/:id", async (req, res) => {
    try {
        const comment = await commentsService.getCommentById(req, res);
        if (!comment) {
            return res.status(status.NOT_FOUND).json({ error: "Comentario no encontrado" });
        }
        return res.status(status.OK).json(comment);
    } catch (exception) {
        return res.status(500).json({ error: exception.message });
    }
});

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Eliminar un comentario por ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       204:
 *         description: Comentario eliminado
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/comments/:id", async (req, res) => {
    try {
        const commentDeleted = await commentsService.deleteComment(req, res);
        return res.status(status.NO_CONTENT).json({ message: "Comentario eliminado", id: commentDeleted.id });
    } catch (exception) {
        return res.status(500).json({ error: exception.message });
    }
});

module.exports = router;
