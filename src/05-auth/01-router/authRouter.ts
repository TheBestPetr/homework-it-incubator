import {Router} from "express";
import {createAuth} from "../02-controllers/authController";

export const authRouter = Router()

authRouter.post('/login', createAuth)