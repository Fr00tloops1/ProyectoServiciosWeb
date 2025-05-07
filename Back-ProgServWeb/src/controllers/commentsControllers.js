const { matchedData } = require('express-validator');
const commentsService = require('../services/comments/comments');

const createComment = async (req, res) => {
    try {
        const result = await commentsService.createComment(req, res);
        return result;
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al crear el comentario', error: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const result = await commentsService.updateComment(req, res);
        return result;
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al actualizar el comentario', error: error.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const result = await commentsService.getComments(req, res);
        return result;
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener los comentarios', error: error.message });
    }
};

const getCommentById = async (req, res) => {
    try {
        const result = await commentsService.getCommentById(req, res);
        return result;
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener el comentario', error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const result = await commentsService.deleteComment(req, res);
        return result;
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al eliminar el comentario', error: error.message });
    }
};

module.exports = {
    createComment,
    updateComment,
    getAllComments,
    getCommentById,
    deleteComment
};