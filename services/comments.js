const { where } = require('sequelize');
const comments = require('../models/comments');
const { status } = require('http-status');

//Crear comentario
const createComment = async (req, res) => {
    try{
        const {answersqID, myAnswersID, comment} = req.body;
    if(!answersqID || !myAnswersID || !comment){
        return res.status(status.BAD_REQUEST).json({error: "Todos los campos son obligatorios."})
    }
    await comments.create({answersqID, myAnswersID, comment});

    return res.json({
        mensaje: "Comentario creado",
        comment: {answersqID, myAnswersID, comment},
    });
}catch(exception){
    return exception.message;
} 
};

//Editar comentario
const updateComment = async (req, res) => {
    try{
        const {id} = req.params;
        const {comment} = req.body;

        const comentario = await comments.findOne({where: {id}});

        if(!comentario){
            return res.status(status.NOT_FOUND).json({error: "Comentario no encontrado"});
        }
        await comments.update({comment});

        return res.json({
            mensaje: "Comentario actualizado",
            comment: {comentario},
        });
    }catch(exception){
        return exception.message;
    }
};
//Eliminar comentario
const deleteComment = async (req, res) => {
    try{
        const {id} = req.params;
        const comentario = await comments.findOne({where: {id}});

        if(!comentario){
            return res.status(status.NOT_FOUND).json({error: "Comentario no encontrado"});
        }

        await comments.destroy();

        return res.json({
            mensaje: "Comentario eliminado",
            comment: {comentario},
        });
    } catch(exception){
        return exception.message;
    }
};
//Obtener todos los comentarios
const getComments = async (req, res) => {
    try{
        const comentarios = await comments.findAll();

        if (comentarios.length === 0){
            return res.status(status.NOT_FOUND).json({error: "No hay comentarios"});
        }
        return res.json({
            mensaje: "Comentarios",
            coments: comentarios,
        });
    }catch(exception){
        return exception.message;
    }
};
module.exports = { createComment, updateComment, deleteComment, getComments };


