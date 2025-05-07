const express = require('express');
const router = express.Router();
const { createComment, updateComment, getAllComments, getCommentById, deleteComment } = require('../../../controllers/commentsControllers');
const verifyToken = require('../../../middlewares/auth');
const { body } = require('express-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - answersqID
 *         - comment
 *       properties:
 *         answersqID:
 *           type: integer
 *           description: ID de la respuesta a la que pertenece el comentario
 *         comment:
 *           type: string
 *           description: Contenido del comentario
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API de gestión de comentarios
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 comentario:
 *                   $ref: '#/components/schemas/Comment'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post(
    "/comments",
    verifyToken,
    [
        body("answersqID").notEmpty().isInt(),
        body("comment").notEmpty().trim()
    ],
    createComment
);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comments]
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
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comentario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 comentario:
 *                   $ref: '#/components/schemas/Comment'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put(
    "/comments/:id",
    verifyToken,
    [
        body("comment").notEmpty().trim()
    ],
    updateComment
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comentarios:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error del servidor
 */
router.get("/comments", getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Obtener un comentario específico
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/comments/:id", getCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comments]
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
 *         description: Comentario eliminado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/comments/:id", verifyToken, deleteComment);

module.exports = router;
