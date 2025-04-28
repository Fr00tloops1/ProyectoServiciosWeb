const { DataTypes, Model } = require('sequelize');
const sequelize = require ('../config/database');

class Comments extends Model {}
Comments.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        answersqID: {
            type: DataTypes.INTEGER,
            references:{
                model: 'answerq',
                key: 'id'
            }
        },
        myAnswersID: {
            type: DataTypes.INTEGER,
            references:{
                model: 'MyAnswer',
                key: 'id'
            }
        },
    },
    {
        modelName: 'Comments',
        tableName: 'comments',
        sequelize
    }
)
Comments.sync({alter: true});

module.exports = Comments