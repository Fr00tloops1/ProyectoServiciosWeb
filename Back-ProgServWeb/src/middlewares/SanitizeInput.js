function sanitizeInput(req, res, next) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].replace(/<[^>]*>?/gm, ''); // elimina etiquetas HTML
      }
    }
    next();
  }

  module.exports = sanitizeInput;