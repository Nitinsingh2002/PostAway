import express from 'express'
import PostController from './post.controller.js';
import upload from '../../middleware/postImage.middleware.js';
import { ValidateAddPost,ValidateUpdate } from '../../middleware/validation.middleware.js';





const postRoutes = express.Router();
const postController = new PostController
postRoutes.post("/create", upload.single('imageUrl'),ValidateAddPost, postController.createPost)
postRoutes.get("/",postController.get)
postRoutes.get("/:id",postController.getSinglePost)
postRoutes.delete("/deletePost/:id" ,postController.getDelete)
postRoutes.put("/update/:id",ValidateUpdate,postController.getUpdate)

export default postRoutes;