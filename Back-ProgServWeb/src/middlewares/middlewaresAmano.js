const Joi = require('joi');

// Validar datos del usuario
const schema = Joi.object({
    NameUser: Joi.string().min(3).required(),
    semester: Joi.number().min(1).required(),
    password: Joi.string().min(8).required(),
});
function validateData(req, res, next){
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    next(); //seguir con el siguiente middleware
}
// Middleware para medir el tiempo de respuesta (made by Kevin)
function responseTimeMiddleware(req, res, next) {
    const start = Date.now(); // Registra el tiempo de inicio

    res.on('finish', () => {
        const duration = Date.now() - start; // Calcula la duración en ms
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${duration}ms`);
    });
    next(); // Llama al siguiente middleware
};

// Exportar ambos middlewares como un objeto
module.exports = { validateData, responseTimeMiddleware };