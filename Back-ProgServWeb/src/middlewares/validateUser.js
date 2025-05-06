const { status } = require("http-status");

function validateUser (req, res, next){
    const {NameUser, semester, password} = req.body
    try {
        if(!NameUser || NameUser.length < 8){
            return res
            .status(status.BAD_REQUEST)
            .json({message:"El nombre de usuario debe contener al menos 8 caracteres"})
        }
        if(!semester || semester < 1 || semester > 9){
            return res
            .status(status.BAD_REQUEST)
            .json({message:"El semestre debe estar en un rango entre 1 y 9"})
        }
        if(!password || password.length < 8){
            return res
            .status(status.BAD_REQUEST)
            .json({message:"La longitud de la contraseña debe ser de al menos 8 caracteres"})
        }
            next();
    } 
    catch (error) {
        return res
        .status(status.NOT_ACCEPTABLE)
        .json({message:"Uno de los campos de registro es incorrecto o esta vacio"});
    }

}

module.exports = validateUser;