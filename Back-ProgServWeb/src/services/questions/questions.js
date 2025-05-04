const questionModel = require('../../models/question');
const {status} = require('http-status');

//Crear Pregunta
const createQ = async (req, res) => {
    try{
        const {content, subject, teacher} = req.body;
        if (!content ||!teacher || !subject){
            return res
            .status(status.BAD_REQUEST)
            .json({error: "Uno de los campos requeridos esta vacio"});
        }
        questionModel.create({content, subject, teacher});
        return res
        .json({mensaje: "La pregunta se ha creado con exito"});
    }
    catch(exception){
        return exception.message;
    }
}
//Mostrar Preguntas
const readQ = async (req,res) => {
    try{
        const question = await questionModel.findAll()
        if(question.length == 0){
            return res
          .status(status.NOT_FOUND)
          .json({ error: "NO hay registros en la base de datos" });
        }
        return res
        .json({
            questions: question
        })
    }
    catch(exception){
        return exception.message;
    }
};
//Actualizar Pregunta
const updateQ = async (req, res) => {
    const { id } = req.params;
    const {content, subject, teacher} = req.body;

    try {
        const question = await questionModel.findOne({id})
        if (!content || !subject || !teacher) {
            return res .status(status.NOT_FOUND).json({ error: "La pregunta no existe"});
            }
            await usuario.update({ content, subject, teacher });
            return res
            .status(status.OK)
            .json({ message: "La pregunta se ha actualizado correctamente"});
    }
    catch (exception) {
        return exception.message;
    }
}
//Eliminar Pregunta
const deleteQ = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await questionModel.findOne({ where: { id } });
        
        if (!usuario) {
        return res 
        .status(status.NOT_FOUND)
        .json({ error: "La pregunta no existe"});
        }
        await question.destroy()
        return res
        .json({
            mensaje: "Pregunta borrada con exito",
          });} 
          catch (exception) {
            return exception.message;
          }
}
module.exports = {createQ, readQ, updateQ, deleteQ}