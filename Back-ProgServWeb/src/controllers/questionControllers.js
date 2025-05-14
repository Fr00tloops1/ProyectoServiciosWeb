const questionService = require('../services/questions/questions');

const createQuestion = async (req, res) => {
    try {
        const question = await questionService.createQ(req, res);
        return res.status(201).json(question);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al crear la pregunta', error: error.message });
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await questionService.readQ(req, res);
        return res.status(200).json({ preguntas: questions });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener las preguntas', error: error.message });
    }
};

const getUserQuestions = async (req, res) => {
    try {
        const questions = await questionService.questionUser(req, res);
        return res.status(200).json({ preguntas: questions });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener las preguntas del usuario', error: error.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        await questionService.deleteQ(req, res);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al eliminar la pregunta', error: error.message });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const question = await questionService.updateQ(req, res);
        return res.status(200).json({ mensaje: 'Pregunta actualizada', pregunta: question });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al actualizar la pregunta', error: error.message });
    }
};

module.exports = {
    createQuestion,
    getQuestions,
    getUserQuestions,
    deleteQuestion,
    updateQuestion
};
