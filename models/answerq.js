const { Model,DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class answerq extends Model {}
answerq.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        questionID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valoration: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    },
    {
    sequelize,
    modelName: 'answerq',
    tableName: 'answersq',
    timestamps: true
    }
);

module.exports = answerq;