const { DataTypes, Model } = require('sequelize');
const sequelize = require ('../config/database');

class myAnswer extends Model {}
myAnswer.init(
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
                model: 'User',
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
    },
    {
        modelName: 'myAnswer',
        tableName: 'myanswers',
        sequelize,
    }
);
myAnswer.sync({alter: true});

module.exports = myAnswer;