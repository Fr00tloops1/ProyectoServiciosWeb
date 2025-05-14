const CommentModel = require('../../models/comments');
const { status } = require('http-status');

const createComment = async (req, res) => {
    try {
        const { answersqID, comment } = req.body;
        const { id } = req.user;

        if (!answersqID || !comment) {
            return res
                .status(status.BAD_REQUEST)
                .json({ error: "El ID de la respuesta y el comentario son requeridos" });
        }

        const newComment = await CommentModel.create({ 
            answersqID, 
            comment,
            userID: id 
        });

        return res
            .status(status.CREATED)
            .json({
                mensaje: "Comentario creado exitosamente",
                comentario: newComment
            });
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const { id: userId } = req.user;

        const commentToUpdate = await CommentModel.findOne({ where: { id } });

        if (!commentToUpdate) {
            return res
                .status(status.NOT_FOUND)
                .json({ error: "Comentario no encontrado" });
        }

        if (commentToUpdate.userID !== userId) {
            return res
                .status(status.FORBIDDEN)
                .json({ error: "No tienes permiso para actualizar este comentario" });
        }

        await commentToUpdate.update({ comment });

        return res
            .status(status.OK)
            .json({
                mensaje: "Comentario actualizado exitosamente",
                comentario: commentToUpdate
            });
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await CommentModel.findAll({
            order: [['createdAt', 'DESC']]
        });

        return res
            .status(status.OK)
            .json({ comentarios: comments });
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await CommentModel.findOne({ where: { id } });

        if (!comment) {
            return res
                .status(status.NOT_FOUND)
                .json({ error: "Comentario no encontrado" });
        }

        return res
            .status(status.OK)
            .json(comment);
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;

        const comment = await CommentModel.findOne({ where: { id } });

        if (!comment) {
            return res
                .status(status.NOT_FOUND)
                .json({ error: "Comentario no encontrado" });
        }

        if (comment.userID !== userId) {
            return res
                .status(status.FORBIDDEN)
                .json({ error: "No tienes permiso para eliminar este comentario" });
        }

        await comment.destroy();

        return res
            .status(status.NO_CONTENT)
            .send();
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

module.exports = {
    createComment,
    updateComment,
    getComments,
    getCommentById,
    deleteComment
};


