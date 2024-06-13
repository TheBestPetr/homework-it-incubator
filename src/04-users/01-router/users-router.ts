import {Router} from "express";
import {userBodyValidation} from "../../validators/users-validator";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";
import {usersController} from "../02-controllers/users-controller";

export const usersRouter = Router()

usersRouter.get('/',
    authBasicMiddleware,
    usersController.findUsers)
usersRouter.post('/',
    authBasicMiddleware,
    userBodyValidation,
    errorsValidationResultMiddleware,
    usersController.createUserController)
usersRouter.delete('/:id',
    authBasicMiddleware,
    usersController.deleteUserController)