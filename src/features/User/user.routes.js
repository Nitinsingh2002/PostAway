import express from 'express'
import UserController from './user.controller.js'
import { ValidateLogIn, ValidateSignUp } from '../../middleware/validation.middleware.js';


const userRouter = express.Router();
const userController = new UserController;


userRouter.post("/signUp", ValidateSignUp, userController.getSignUp);
userRouter.post("/logIn", ValidateLogIn, userController.getLogIn);

export default userRouter;