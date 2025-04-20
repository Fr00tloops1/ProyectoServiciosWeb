const {DataTypes} = require ('sequelize');
const sequelize = require ('../config/database');
const User = require ('./user');

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
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
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