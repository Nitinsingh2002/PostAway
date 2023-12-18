import PostModel from "../post/post.model.js";

export default class LikeController {



Likes(req, res) {
        const postId  = req.params.id;
        const userId = req.userId
        const userName = req.userName


        const result = PostModel.ToggleLikes(postId, userId, userName)
        res.status(200).send(result);
    }

    getLikes(req,res){
        const userId = req.userId;
        const postId = req.params.id;

        const result = PostModel.getAllLike(postId,userId)

        res.status(201).send(result);

    }

}