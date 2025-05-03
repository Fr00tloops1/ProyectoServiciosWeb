const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}
User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        iguana: {
            type: DataTypes.STRING,
            allowNull: false
        },
        semester: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'user',
        tableName: 'user',
        sequelize,
    }
);
User.sync({alter: true});

module.exports = User;