const express = require('express');
const router = express.Router();
const answersService = require('../../../services/answers/answers');
const { status } = require("http-status");
const verifyToken = require('../../../middlewares/auth');
// Crear respuesta
router.post("/responder",verifyToken, async (req, res) => {
  try {
      const respuesta = await answersService.CrearRespuesta(req, res);
      return res.status(201).json(respuesta);
  } catch (exception) {
      return res.status(500);
  }
});

// Editar respuesta
router.put("/respuesta/:id", async (req, res) => {
  try {
      const respuestaedit = await answersService.UpdateAnswer(req, res);
      return res.status(status.OK).json({ message: 'Respuesta actualizada'});
  } catch (exception) {
      return res.status(500);
  }
});

// Ver todos los comentarios
router.get("/misrespuestas", async (req, res) => {
  try {
      const comments = await commentsService.getComments(req, res);
      return res.status(status.OK).json(comments);
  } catch (exception) {
      return res.status(500);
  }
});

// Borrar comentario
router.delete("/borrarrespuesta/:id", async (req, res) => {
  try {
      const respuestadelete = await answersService.DeleteAns(req, res);
      return res.status(status.NO_CONTENT).json(commentDeleted);
  } catch (exception) {
      return res.status(500);
  }
});

module.exports = router;
