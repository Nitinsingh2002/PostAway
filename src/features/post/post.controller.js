import PostModel from "./post.model.js";



export default class PostController {
    createPost(req, res) {
        const { description } = req.body;
        const imageUrl = req.file.filename;
        const userId = req.userId;
        const name = req.userName;

        const result = PostModel.postCreation(description, imageUrl, userId, name)

        if (!result) {
            res.status(400).send("Error in post creation")
        }
        res.status(200).send(result)
    }

    get(req, res) {
        const result = PostModel.getAll();
        res.status(200).send(result);
    }

    getSinglePost(req, res) {
        const { id } = req.params;
        console.log('id is', id)
        const result = PostModel.singlePost(id)
        if (!result) {
            res.status(400).send("post not found")
        }
        res.status(200).send(result)
    }

    getDelete(req, res) {
        const userId = req.userId
        const { id } = req.params;
        const error = PostModel.deletePost(userId, id)

        if (error) {
            res.status(400).send(error)
        } else {
            res.status(200).send("post deleted sucessfully")
        }
    }

    getUpdate(req, res) {
        const userId = req.userId;
        const { id } = req.params;
        const { description } = req.body;

        const result = PostModel.updatePost(userId,id,description)
        res.status(200).send(result);
    }
}

