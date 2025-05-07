const AnswersModel = require('../../models/answerq');
const { status } = require('http-status');
require('dotenv').config();
const process = require('process');
const JWT = require('jsonwebtoken');

const CrearRespuesta = async (req, res) => {
    try {
    
      const { content } = req.body;
      const {id} = req.user;
      const userID = id;
      if (!content) {
        return res
          .status(status.BAD_REQUEST)
          .json({ error: "Respuesta vacia." });
      }
  
      AnswersModel.create({ userID,content });
  
      return res.json({
        mensaje: "Respuesta creada",
      });
    } catch (exception) {
      return exception.message;
    }
  };
  
  //actualizar respuesta
  
  const UpdateAnswer = async (req, res) => {
  
    const { id } = req.params;
    const { content } = req.body;
  
  
    try {
        const respuestaEdit = await myanswersModel.findOne({ where: { id } });
  
        if (!respuestaEdit) {
        return res .status(status.NOT_FOUND).json({ error: "Respuesta no encontrada"});
        }
        await respuestaEdit.update({ content } );
        return res
        .status(status.OK)
        .json({ message: "respuesta actualizado", respuesta: respuestaEdit });
    } catch (exception) {
        return exception.message;
      }
  };
  
  
  const DeleteAns = async (req, res) => {
    try {
        const { id } = req.params;
        const answer = await AnswersModel.findOne({ where: { id } });
        
        if (!answer) {
        return res .status(status.NOT_FOUND).json({ error: "Respuesta no encontrado"});
        }
        await answer.destroy()
        return res
        .json({
            mensaje: "Usuario borrado con exito",
            user: { usuario },
          });
          
    } catch (exception) {
        return exception.message;
      }
  };


  
 
  
  module.exports = { UpdateAnswer , CrearRespuesta , DeleteAns};