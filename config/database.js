require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log(`Conectando a la Base de Datos: ${dbName}`))
    .catch(() => console.log(`Error al conectando a la Base de Datos: ${dbName}`));

    module.exports = sequelize;