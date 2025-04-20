const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database');

const myAnswer = sequelize.define(
    "myAnswer",
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        valoration:{
            type: DataTypes.TINYINT,
            allowNull: true
        }
    }
);

module.exports = myAnswer;