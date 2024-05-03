import {Router} from "express";
import {createUserController, deleteUserController, getUsers} from "../02-controllers/UsersController";
import {userBodyValidation} from "../../middlewares/usersValidator";
import {errorsValidationResultMiddleware} from "../../middlewares/errorsValidationMiddleware";

export const usersRouter = Router()

usersRouter.get('/',
    getUsers)
usersRouter.post('/',
    userBodyValidation,
    errorsValidationResultMiddleware,
    createUserController)
usersRouter.delete('/:id',
    deleteUserController)