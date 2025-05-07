const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}
User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'name'
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
        modelName: 'User',
        tableName: 'user',
        sequelize,
    }
);

module.exports = User;