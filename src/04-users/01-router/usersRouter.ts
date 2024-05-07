import {Router} from "express";
import {createUserController, deleteUserController, getUsers} from "../02-controllers/UsersController";
import {userBodyValidation} from "../../middlewares/usersValidator";
import {errorsValidationResultMiddleware} from "../../middlewares/errorsValidationMiddleware";
import {authMiddleware} from "../../middlewares/authMiddleware";

export const usersRouter = Router()

usersRouter.get('/',
    authMiddleware,
    getUsers)
usersRouter.post('/',
    authMiddleware,
    userBodyValidation,
    errorsValidationResultMiddleware,
    createUserController)
usersRouter.delete('/:id',
    authMiddleware,
    deleteUserController)