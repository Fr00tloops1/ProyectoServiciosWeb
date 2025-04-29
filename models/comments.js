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
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        myAnswersID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'myanswers',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        comment: {
            type: DataTypes.STRING(140),
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'comments',
        tableName: 'comments',
        timestamps: true
    }
);

Comments.sync({ alter: true });

module.exports = Comments;