import {Router} from "express";
import {createUserController, deleteUserController, getUsers} from "../02-controllers/UsersController";
import {userBodyValidation} from "../../validators/usersValidator";
import {errorsValidationResultMiddleware} from "../../validators/errorsValidationMiddleware";
import {authBasicMiddleware} from "../../middlewares/authBasicMiddleware";

export const usersRouter = Router()

usersRouter.get('/',
    authBasicMiddleware,
    getUsers)
usersRouter.post('/',
    authBasicMiddleware,
    userBodyValidation,
    errorsValidationResultMiddleware,
    createUserController)
usersRouter.delete('/:id',
    authBasicMiddleware,
    deleteUserController)