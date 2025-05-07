require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER || 'root';
const dbPass = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'test' ? false : console.log
});

sequelize.authenticate()
    .then(() => console.log(`Conectando a la Base de Datos: ${dbName}`))
    .catch(() => console.log(`Error al conectar a la Base de Datos: ${dbName}`));

module.exports = sequelize;