const answersService = require('../services/answers/answers');

const createAnswer = async (req, res) => {
    try {
        const answer = await answersService.CrearRespuesta(req, res);
        return res.status(201).json({
            mensaje: 'Respuesta creada exitosamente',
            respuesta: answer
        });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al crear la respuesta', error: error.message });
    }
};

const updateAnswer = async (req, res) => {
    try {
        const answer = await answersService.UpdateAnswer(req, res);
        return res.status(200).json({
            mensaje: 'Respuesta actualizada exitosamente',
            respuesta: answer
        });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al actualizar la respuesta', error: error.message });
    }
};

const getUserAnswers = async (req, res) => {
    try {
        const answers = await answersService.GetUserAnswers(req, res);
        return res.status(200).json({ respuestas: answers });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener las respuestas', error: error.message });
    }
};

const deleteAnswer = async (req, res) => {
    try {
        await answersService.DeleteAns(req, res);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al eliminar la respuesta', error: error.message });
    }
};

const getAllAnswersByQuestion = async (req, res) => {
    try {
        const answers = await answersService.GetAllAnswersByQuestion(req, res);
        return res.status(200).json({ respuestas: answers });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener las respuestas', error: error.message });
    }
};

module.exports = {
    createAnswer,
    updateAnswer,
    getUserAnswers,
    deleteAnswer,
    getAllAnswersByQuestion
}; 