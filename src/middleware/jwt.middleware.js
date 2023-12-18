import jwt from 'jsonwebtoken'

function JwtMiddleware(req, res, next) {
    const token = req.headers["authorization"]
    

    if (!token) {
        return res.status(401).send("Unauthorised acess")
    }
    try {
        const payload = jwt.verify(token, 'Ezx/l)I6rRsxBg9')
        
        req.userId = payload.userId;
        req.userEmail = payload.userEmail;
        req.userName = payload.userName;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send("Unauthorized Acess")
    }
}


export default JwtMiddleware;