const questionModel = require('../../models/question');
const UserModel = require('../../models/user');
const {status} = require('http-status');

  const createQ = async (req, res) => {
    try {

      const { id } = req.params;
      const { content, subject, teacher } = req.body;

      const user = await UserModel.findOne({ where: { id } });
      console.log(user);

      if (!user) {
        return res.status(status.NOT_FOUND).json({ error: "Usuario no encontrado" });
        }
        if (!id) {
          return res.status(status.BAD_REQUEST).json({ error: "ID de usuario faltante" });
        }
        

      if (!content || !teacher || !subject) {
        return res
          .status(status.BAD_REQUEST)
          .json({ error: "Uno de los campos requeridos está vacío" });
      }

      const nuevaPregunta = await questionModel.create({ userId: id,content, subject, teacher });

      return res
        .status(status.CREATED)
        .json({ mensaje: "La pregunta se ha creado con éxito", pregunta: nuevaPregunta });

    } catch (exception) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: exception.message });
    }
  };

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