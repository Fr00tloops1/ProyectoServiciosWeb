const { Model, DataTypes } = require('sequelize');
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
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
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

