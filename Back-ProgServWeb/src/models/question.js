const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database');
const userModel = require('../models/user')


class Question extends Model {}
Question.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
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
    },
    {
        modelName: 'Question',
        tableName: 'questions',
        timestamps: false,
        sequelize,
    }
);


module.exports = Question;