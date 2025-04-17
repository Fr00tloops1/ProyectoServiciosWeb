const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
    "User",
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        semester: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    }
);

module.exports = User;