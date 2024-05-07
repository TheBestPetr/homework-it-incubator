import {Router} from "express";
import {createAuth} from "../02-controllers/authController";
import {authValidation} from "../../middlewares/authValidator";

export const authRouter = Router()

authRouter.post('/login',
    authValidation,
    createAuth)