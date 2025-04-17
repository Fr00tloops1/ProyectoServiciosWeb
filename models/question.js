const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define(
    "Question",
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
                model: a,
                key: b
            }
        },
        subject: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        teacher: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        content: {
            type: DataTypes.CHAR,
            allowNull: false
        }
    }
);

module.exports = Question;