import express from 'express';
import LikeController from './like.controller.js';

const likeRoutes = express.Router();
const likeController = new LikeController();

likeRoutes.post("/:id", likeController.Likes);
likeRoutes.get("/:id", likeController.getLikes)

export default likeRoutes;
