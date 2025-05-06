const { matchedData } = require('express-validator');
const commentsService = require('../services/comments/comments');
class commentsControllers {

    async createComment(req, res) {
        const data = matchedData(req);
        const comment = await commentsService.createComment(req, res);
        return res.status(201).json(comment);
    }

    async getComments(req, res) {
        const comments = await commentsService.getComments(req, res);
        return res.status(200).json(comments);
    }
    async updateComment(req, res) {
        const data = matchedData(req);
        const comment = await commentsService.updateComment(req, res);
        return res.status(200).json(comment);
    }
    async deleteComment(req, res) {
        const comment = await commentsService.deleteComment(req, res);
        return res.status(200).json(comment);
    }

}
module.exports = commentsControllers;