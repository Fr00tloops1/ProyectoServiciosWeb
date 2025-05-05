const Joi = require('joi');


// Validar datos del usuario
const schema = Joi.object({
    NameUser: Joi.string().min(3).presence('required'),
    semester: Joi.number().min(1).presence('required'),
    password: Joi.string().min(8).presence('required'),
});

function validateData(req, res, next){
    const {error} = schema.validate(req.body);
    if(error){
        return res
        .status(400)
        .json({error: error});
    }
    next()
}

module.exports = validateData;