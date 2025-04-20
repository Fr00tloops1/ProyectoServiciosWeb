const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database');
const User = require ('./user');

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
                model: User,
                key: 'id'
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