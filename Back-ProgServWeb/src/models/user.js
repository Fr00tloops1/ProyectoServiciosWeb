const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const { use } = require('../routes/public');

class User extends Model {}
User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true
        },
        NameUser: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            
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