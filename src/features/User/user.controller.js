import jwt from 'jsonwebtoken';
import userModel from "./user.model.js"

export default class UserController {

    getSignUp(req, res) {
        const { name, email, password } = req.body;
        const user = userModel.SignUp(name, email, password);
        return res.status(201).send(user)
    }

    getLogIn(req, res) {
        const { email, password } = req.body
        const result = userModel.LogIn(email, password)
        if (!result) {
            res.status(400).send("Incorrect Credentails")
        }
        else {
            const token = jwt.sign({ userId: result.id, userEmail: result.email, userName: result.name }, 'Ezx/l)I6rRsxBg9', { expiresIn: '1h' });
            res.status(200).send(token);
        }
    }

}