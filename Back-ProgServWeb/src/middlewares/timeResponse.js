// Middleware para medir el tiempo de respuesta
function responseTimeMiddleware(req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${duration}ms`);
    });
    next();
};

module.exports =  responseTimeMiddleware;