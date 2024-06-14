import {Router} from "express";
import {userBodyValidation} from "../../validators/users-validator";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";
import {usersController} from "../02-controllers/users-controller";

export const usersRouter = Router()

usersRouter.get('/',
    authBasicMiddleware,
    usersController.findUsers.bind(usersController))

usersRouter.post('/',
    authBasicMiddleware,
    userBodyValidation,
    errorsValidationResultMiddleware,
    usersController.createUserController.bind(usersController))

usersRouter.delete('/:id',
    authBasicMiddleware,
    usersController.deleteUserController.bind(usersController))