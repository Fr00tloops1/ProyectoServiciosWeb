const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const answersq = require("./answerq");

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "Comment",
        tableName: "comments",
        timestamps: true,
    }
);

Comment.belongsTo(answersq, { foreignKey: 'answersqID' });

module.exports = Comment;
