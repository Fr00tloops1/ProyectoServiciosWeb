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
           // Omar ya que hayas hecho el modelo de answersQ, aqui agrega la referencia:
           // references:{
            //    model: '',
             //   key: 'id'
            //}
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