import express from 'express'
import CommentController from './comment.controller.js';

const CommentRoutes = express.Router();
const commentController = new CommentController

CommentRoutes.post("/:id", commentController.postComment)
CommentRoutes.get("/:id", commentController.getComment)
CommentRoutes.delete("/post/:postId/comment/:commentId", commentController.deleteComment)
CommentRoutes.put("/updateComment", commentController.getUpdateComment)

export default CommentRoutes;