const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

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
            references: {
                model: 'answersq',
                key: 'id'
            }
            
        },
        comment: {
            type: DataTypes.STRING(140),
            allowNull: false,
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
        modelName: 'Comments',
        tableName: 'comments',
        timestamps: true

    }
);


module.exports = Comments;
