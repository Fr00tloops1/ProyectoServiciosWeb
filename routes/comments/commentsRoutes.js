const express = require('express');
const router = express.Router();
const commentsService = require('../../services/comments');
const { status } = require("http-status");

// Crear comentario
router.post("/comentarios", async (req, res) => {
  try {
      const comment = await commentsService.createComment(req, res);
      return res.status(201).json(comment);
  } catch (exception) {
      return res.status(500);
  }
});

// Editar comentario
router.put("/comentarios/:id", async (req, res) => {
  try {
      const commentUpdated = await commentsService.updateComment(req, res);
      return res.status(status.OK).json({ message: 'Comentario actualizado', comment: commentUpdated });
  } catch (exception) {
      return res.status(500);
  }
});

// Ver todos los comentarios
router.get("/comentarios", async (req, res) => {
  try {
      const comments = await commentsService.getComments(req, res);
      return res.status(status.OK).json(comments);
  } catch (exception) {
      return res.status(500);
  }
});

// Borrar comentario
router.delete("/comentarios/:id", async (req, res) => {
  try {
      const commentDeleted = await commentsService.deleteComment(req, res);
      return res.status(status.NO_CONTENT).json(commentDeleted);
  } catch (exception) {
      return res.status(500);
  }
});

module.exports = router;
