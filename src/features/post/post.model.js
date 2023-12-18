import moment from 'moment';
import userMode from '../User/user.model.js';
import userModel from '../User/user.model.js';


export default class PostModel {
    constructor(id, userId, name, description, imageUrl) {
        this.id = id
        this.userId = userId
        this.name = name
        this.description = description
        this.imageUrl = imageUrl
        this.timestamp = moment().format('YYYY-MM-DD HH:mm')
        this.likes=[]   }

    static postCreation(description, imageUrl, userId, name) {
        const newPost = new PostModel(
            posts.length + 1,
            userId,
            name,
            description,
            imageUrl,
            moment().format('YYYY-MM-DD HH:mm')
        )
        posts.push(newPost);
        return newPost;
    }

    static getAll() {
        return posts;
    }

    static singlePost(id) {
        const post = posts.find((p) => p.id == id)
        return post;
    }

    static deletePost(userId, id) {
        const index = posts.findIndex((p) => p.userId == userId && p.id == id)
        if (index == -1) {
            return ("post not found")
        }
        else {
            posts.splice(index, 1)
        }
    }

    static updatePost(userId, id, description) {
        const post = posts.find((p) => p.userId == userId && p.id == id)
        if (!post) {
            return ("Post not found")
        } else {
            post.description = description;
            return post;
        }
    }

    //**************************comment section work start**************************************** */
    static addComment(userId, commentedBy, commentBody, postId) {

        const post = posts.find((p => p.id == postId))
        if (!post) {
            return ("post not found")
        }

        const user = userMode.getAllUser().find((u) => u.id == userId)
        if (!user) {
            return (" User not found");
        }


        if (!post.comments) {
            post.comments = [];
            post.comments.push({
                id: post.comments.length + 1,
                userId: userId,
                userName: commentedBy,
                description: commentBody,
                timestamp: moment().format('YYYY-MM-DD HH:mm')
            })
        } else {
            post.comments.push({
                id: post.comments.length + 1,
                userId: userId,
                userName: commentedBy,
                description: commentBody,
                timestamp: moment().format('YYYY-MM-DD HH:mm')
            })
        }
        return post;
    }

    static getAllComments(postId) {
        const post = posts.find((p) => p.id == postId)
        if (!post) {
            return ("Post not found")
        }
        else {
            return post.comments;
        }
    }

    static deleteComment(userId, postId, commentId) {
        const post = posts.find((p) => p.id == postId);
        if (!post) {
            return ("Post not found");
        }

        const comment = post.comments.find((c) => c.id == commentId);
        if (!comment) {
            return ("Comment not found");
        }

        // Only owner or the person who created this comment can delete this comment
        if (post.userId == userId || comment.userId == userId) {
            const commentIndex = post.comments.findIndex((c) => c.id == commentId);
            post.comments.splice(commentIndex, 1);
            return post;
        } else {
            return ("You are not authorized to delete this comment");
        }
    }

    static updateCommment(userId, postId, commentId, description) {
        const post = posts.find((p) => p.id == postId)
        if (!post) {
            return ("POST NOT FOUND")
        }

        const comment = post.comments.find((c) => c.id == commentId)
        if (!comment) {
            return ("COMMENT NOT FOUND")
        }

        if (comment.userId == userId) {
            comment.description = description
            return post;
        } else {
            return ("Unauthorized : You can't update this post")
        }
    }

    //******************************like section start*****************************


    static ToggleLikes(postId, userId, userName) {
      


        const post = posts.find((p) => p.id == postId);
        if (!post) {
            return ("POST NOT FOUND");
        }
    
        const user = userMode.getAllUser().find((u) => u.id == userId);
        if (!user) {
            return ("USER NOT FOUND");
        }
    
        const existingIndex = post.likes.findIndex((l) => l.userId == userId);
        if (existingIndex !== -1) {
            post.likes.splice(existingIndex, 1);
            return post;
        } else {
            const newLike = {
                likeCount :post.likes.length +1,
                userId,
                userName,
                timestamp: moment().format('YYYY-MM-DD HH:mm'),
            };
            post.likes.push(newLike);
            return post;
        }
    }
    

    static getAllLike (postId,userId){
        console.log(postId,userId)

        const post = posts.find((p)=>p.id ==postId)
        if(!post){
            return(" POST NOT FOUND")
        }

        const user = userModel.getAllUser().find((u)=>u.id == userId)
        if(!user){
            return(" User not found")
        }


        return post.likes;
    }

}

var posts = []


