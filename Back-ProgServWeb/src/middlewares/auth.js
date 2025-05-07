const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Aquí es donde creas req.user
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido" });
  }
};

module.exports = verifyToken;
