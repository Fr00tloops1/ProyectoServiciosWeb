const { where } = require('sequelize');
const CommentModel = require('../../models/comments'); 
const { status } = require('http-status');

// Crear comentario
const createComment = async (req, res) => {
    try {
        const asnwersqID = req.params;
        const {id} = req.user;
        const userID = id;
        const {comment } = req.body;
        if (!answersqID || !myAnswersID || !comment) {
            return res.status(status.BAD_REQUEST).json({ error: "Todos los campos son obligatorios." });
        }

        const newComment = await CommentModel.create({ answersqID,userID,comment });

        return res.json({
            mensaje: "Comentario creado",
            comment: newComment,
        });
    } catch (exception) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: exception.message });
    }
};

// Editar comentario
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const commentToUpdate = await CommentModel.findOne({ where: { id } }); 

        if (!commentToUpdate) {
            return res.status(status.NOT_FOUND).json({ error: "Comentario no encontrado" });
        }
        if (CommentModel.userID !== req.user.id) return res.status(403).json({ error: "No autorizado" });
        await commentToUpdate.update({ comment }, { where: { id } });

        return res.json({
            mensaje: "Comentario actualizado",
            comment: { id, comment },
        });
    } catch (exception) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: exception.message });
    }
};

// Eliminar comentario
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const commentToDelete = await CommentModel.findOne({ where: { id } }); 

        if (!commentToDelete) {
            return res.status(status.NOT_FOUND).json({ error: "Comentario no encontrado" });
        }

        await commentToDelete.destroy({ where: { id } });

        return res.json({
            mensaje: "Comentario eliminado",
            id: id,
        });
    } catch (exception) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: exception.message });
    }
};

// Obtener todos los comentarios de una pregunta
const getComments = async (req, res) => {
    try {
        const answersqID = req.params;
        const allComments = await CommentModel.findAll({ where: { answersqID} }); 
        if (allComments.length === 0) {
            return res.status(status.NOT_FOUND).json({ error: "No hay comentarios" });
        }
        return res.json({
            mensaje: "Comentarios",
            comments: allComments,
        });
    } catch (exception) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: exception.message });
    }
};
// Obtener comentario por ID
const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await CommentModel.findOne({ where: { id } });

        if (!comment) {
            return res.status(status.NOT_FOUND).json({ error: "Comentario no encontrado" });
        }

        return res.json({
            mensaje: "Comentario encontrado",
            comment: comment,
        });
    } catch (exception) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: exception.message });
    }
};

module.exports = { createComment, updateComment, deleteComment, getComments, getCommentById };


