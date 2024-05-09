import {Router} from "express";
import {getUserInfo, loginUser} from "../02-controllers/authController";
import {authBodyValidation} from "../../validators/authValidator";
import {authBearerMiddleware} from "../../middlewares/authBearerMiddleware";

export const authRouter = Router()

authRouter.post('/login',
    authBodyValidation,
    loginUser)

authRouter.get('/me',
    authBearerMiddleware,
    getUserInfo)