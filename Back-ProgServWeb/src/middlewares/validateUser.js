const Joi = require('joi');

const schema = Joi.object({
    NameUser: Joi.string().min(3).required,
    password: Joi.string().min(8).required,
});

function validateData(req, res){
    const {error} = schema.validate(req.body);
    if(error){
        return res
        .status(400)
        .json({error: error});
    }
}

module.exports = validateData;