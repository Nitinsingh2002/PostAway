import PostModel from "../post/post.model.js";
export default class CommentController {

    postComment(req, res) {
        const userId = req.userId;
        const commentedBy = req.userName;
        const { commentBody } = req.body
        const postId = req.params.id;


        console.log(userId, commentedBy, commentBody, postId)

        const result = PostModel.addComment(userId, commentedBy, commentBody, postId)
        res.status(200).send(result);

    }

    getComment(req, res) {
        const postId = req.params.id;
        const result = PostModel.getAllComments(postId);
        res.status(200).send(result);
    }

    deleteComment(req, res) {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const userId = req.userId;

        const result = PostModel.deleteComment(userId, postId, commentId)
        res.status(200).send(result);
    }

    getUpdateComment(req, res) {
        const userId = req.userId;
        const postId = req.query.postId;
        const description = req.body.description
        const commentId = req.query.commentId



        const result = PostModel.updateCommment(userId, postId, commentId, description)
        res.status(200).send(result);

    }
}