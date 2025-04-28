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
//Mostrar Pregunta
const readQ = async (req,res) => {
    try{

    }
    catch{

    }
}
//Actualizar Pregunta
const updateQ = async (req, res) => {

}
//Eliminar Pregunta
const deleteQ = async (req, res) => {

}
module.exports = {createQ}