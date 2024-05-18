import {Router} from "express";
import {
    getUserInfo,
    loginUser,
    userRegistration,
    userRegistrationConfirmation,
    userRegistrationEmailResending
} from "../02-controllers/authController";
import {
    authConfirmRegistrationBodyValidation,
    authLoginBodyValidation,
    authRegistrationBodyValidation, authResendingEmailValidation
} from "../../validators/authValidator";
import {authBearerMiddleware} from "../../middlewares/authBearerMiddleware";
import {errorsValidationResultMiddleware} from "../../validators/errorsValidationMiddleware";

export const authRouter = Router()

authRouter.post('/login',
    authLoginBodyValidation,
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