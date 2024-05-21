import {Router} from "express";
import {createUserController, deleteUserController, getUsers} from "../02-controllers/users-controller";
import {userBodyValidation} from "../../validators/users-validator";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";

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