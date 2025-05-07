const AnswersModel = require('../../models/answerq');
const { status } = require('http-status');
require('dotenv').config();
const process = require('process');
const JWT = require('jsonwebtoken');

const CrearRespuesta = async (req, res) => {
    try {
        const { content, questionId } = req.body;
        const { id } = req.user;
        const userID = id;

        if (!content || !questionId) {
            return res
                .status(status.BAD_REQUEST)
                .json({ error: "El contenido y el ID de la pregunta son requeridos" });
        }

        const answer = await AnswersModel.create({ userID, content, questionId });
        return res
            .status(status.CREATED)
            .json({
                mensaje: "Respuesta creada exitosamente",
                respuesta: answer
            });
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

const UpdateAnswer = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const respuestaEdit = await AnswersModel.findOne({ where: { id } });

        if (!respuestaEdit) {
            return res
                .status(status.NOT_FOUND)
                .json({ error: "Respuesta no encontrada" });
        }

        await respuestaEdit.update({ content });
        return res
            .status(status.OK)
            .json({
                mensaje: "Respuesta actualizada exitosamente",
                respuesta: respuestaEdit
            });
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

const DeleteAns = async (req, res) => {
    try {
        const { id } = req.params;
        const answer = await AnswersModel.findOne({ where: { id } });

        if (!answer) {
            return res
                .status(status.NOT_FOUND)
                .json({ error: "Respuesta no encontrada" });
        }

        await answer.destroy();
        return res
            .status(status.NO_CONTENT)
            .send();
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

const GetUserAnswers = async (req, res) => {
    try {
        const { id } = req.user;
        const answers = await AnswersModel.findAll({
            where: { userID: id },
            order: [['createdAt', 'DESC']]
        });

        return res
            .status(status.OK)
            .json({
                respuestas: answers
            });
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

const GetAllAnswersByQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const answers = await AnswersModel.findAll({
            where: { questionId },
            order: [['createdAt', 'DESC']]
        });

        return res
            .status(status.OK)
            .json({
                respuestas: answers
            });
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: exception.message });
    }
};

module.exports = {
    CrearRespuesta,
    UpdateAnswer,
    DeleteAns,
    GetUserAnswers,
    GetAllAnswersByQuestion
};