const User = require('./user');
const Question = require('./question');
const answerq = require('./answerq');
const Comments = require('./comments');

function associateModels() {
    Question.hasMany(answerq, {foreignKey: 'questionID'});
    Question.belongsTo(User, { foreignKey: 'userID', as: 'user' });

    User.hasMany(Question, { foreignKey: 'userID', as: 'questions' });
    User.hasMany(answerq, { foreignKey: 'userID', as: 'answers' });
    User.hasMany(Comments, { foreignKey: 'userID', as: 'comments' });

    answerq.belongsTo(Question, {foreignKey: 'questionID',as: 'question'});
  answerq.belongsTo(User, {foreignKey: 'userID',as: 'user'});
   answerq.hasMany(Comments, {    foreignKey: 'answersqID',as: 'comments'});

   Comments.belongsTo(User, { foreignKey: 'userID', as: 'user' });
   Comments.belongsTo(answerq, { foreignKey: 'answersqID', as: 'answer' });
  }
  
  module.exports = associateModels;