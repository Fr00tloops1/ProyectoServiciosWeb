
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
module.exports =  responseTimeMiddleware;