const questionModel = require('../../models/question');
const UserModel = require('../../models/user');
const {status} = require('http-status');

//Crear Pregunta
const createQ = async (req, res) => {
    try {
        const {content, subject, teacher} = req.body;
        const {id} = req.user;
        const userID = id;
        
        if (!content || !teacher || !subject) {
            return res
                .status(status.BAD_REQUEST)
                .json({error: "Uno de los campos requeridos esta vacio"});
        }
        
        const question = await questionModel.create({userID, content, subject, teacher});
        return res
            .status(status.CREATED)
            .json({
                mensaje: "La pregunta se ha creado con exito",
                pregunta: question
            });
    } catch(exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({error: exception.message});
    }
};

//Mostrar Preguntas
const readQ = async (req, res) => {
    try {
        const questions = await questionModel.findAll();
        if(questions.length === 0) {
            return res
                .status(status.NOT_FOUND)
                .json({ error: "NO hay registros en la base de datos" });
        }
        return res
            .status(status.OK)
            .json({
                preguntas: questions
            });
    } catch(exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({error: exception.message});
    }
};

//Actualizar Pregunta
const updateQ = async (req, res) => {
    const { id } = req.params;
    const {content, subject, teacher} = req.body;

    try {
        const question = await questionModel.findOne({where: {id}});
        if (!question) {
            return res
                .status(status.NOT_FOUND)
                .json({ error: "La pregunta no existe"});
        }
        
        if (!content || !subject || !teacher) {
            return res
                .status(status.BAD_REQUEST)
                .json({ error: "Todos los campos son requeridos"});
        }
        
        await question.update({ content, subject, teacher });
        return res
            .status(status.OK)
            .json({ 
                mensaje: "La pregunta se ha actualizado correctamente",
                pregunta: question
            });
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({error: exception.message});
    }
};

const questionUser = async (req, res) => {
    try {
        const preguntasUsuario = await questionModel.findAll({
            where: { userID: req.user.id },
            //order: [['createdAt', 'DESC']]
        });
        
        return res
            .status(status.OK)
            .json({
                preguntas: preguntasUsuario
            });
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({error: exception.message});
    }
};

//Eliminar Pregunta
const deleteQ = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await questionModel.findOne({ where: { id } });
        
        if (!question) {
            return res 
                .status(status.NOT_FOUND)
                .json({ error: "La pregunta no existe"});
        }
        
        await question.destroy();
        return res
            .status(status.NO_CONTENT)
            .send();
    } catch (exception) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({error: exception.message});
    }
};

module.exports = {
    createQ,
    readQ,
    updateQ,
    deleteQ,
    questionUser
};