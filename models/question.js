const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database');

class Question extends Model {}
Question.init(
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
                model: 'user',
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
        modelName: 'questions',
        tableName: 'questions',
        sequelize,
    }
);
Question.sync({alter: true});

module.exports = Question;