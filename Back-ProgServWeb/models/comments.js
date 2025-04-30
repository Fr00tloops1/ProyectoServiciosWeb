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
            allowNull: false,
            references:{
                model: 'Question',
                key: 'id'
            }
        },
        myAnswersID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'myAnswer',
                key: 'id'
            }
        },
        comment:{
            type: DataTypes.STRING(140),
            allowNull: false,
        }
    },
    {
        modelName: 'Comments',
        tableName: 'comments',
        sequelize
    }
)
Comments.sync({alter: true});

module.exports = Comments