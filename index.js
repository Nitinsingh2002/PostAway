import express from 'express'
import userRouter from './src/features/User/user.routes.js';
import bodyParser from 'body-parser';
import JwtMiddleware from './src/middleware/jwt.middleware.js';
import postRoutes from './src/features/post/post.routes.js';
import CommentRoutes from './src/features/comment/comment.routes.js';
import likeRoutes from './src/features/like/like.routes.js';
import cors from 'cors'



const app = express();

app.use(cors())
app.use(bodyParser.json())


app.use('/api/user', userRouter)
app.use("/api/post", JwtMiddleware, postRoutes)
app.use("/api/comments", JwtMiddleware, CommentRoutes)
app.use("/api/like", JwtMiddleware, likeRoutes)

app.get("/", (req, res) => {
    res.end(" Welcome to social media API")
})



app.use((err, req, res, next) => {
    //server error
    res.status(500).send("Something went wrong. Please try again later.");
});



//midleware to handle 404 request
app.use((req, res) => {
    return res.status(401).send("Resource not found")
})





app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server is running on port number : 3000")
})