import {Router} from "express";
import {
    createNewTokensController,
    getUserInfo,
    loginUser, userLogout,
    userRegistration,
    userRegistrationConfirmation,
    userRegistrationEmailResending
} from "../02-controllers/auth-controller";
import {
    authConfirmRegistrationBodyValidation,
    authLoginBodyValidation,
    authRegistrationBodyValidation, authResendingEmailValidation
} from "../../validators/auth-validator";
import {authBearerMiddleware} from "../../middlewares/auth-bearer-middleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";

export const authRouter = Router()

authRouter.post('/login',
    authLoginBodyValidation,
    errorsValidationResultMiddleware,
    loginUser)

authRouter.get('/me',
    authBearerMiddleware,
    getUserInfo)

authRouter.post('/registration',
    authRegistrationBodyValidation,
    errorsValidationResultMiddleware,
    userRegistration)

authRouter.post('/registration-confirmation',
    authConfirmRegistrationBodyValidation,
    errorsValidationResultMiddleware,
    userRegistrationConfirmation)

authRouter.post('/registration-email-resending',
    authResendingEmailValidation,
    errorsValidationResultMiddleware,
    userRegistrationEmailResending)

authRouter.post('/refresh-token',
    createNewTokensController)

authRouter.post('/logout',
    userLogout)