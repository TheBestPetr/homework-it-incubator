import {Router} from "express";
import {
    createNewTokensController,
    getUserInfo,
    loginUser,
    newPasswordConfirmation,
    passwordRecovery,
    userLogout,
    userRegistration,
    userRegistrationConfirmation,
    userRegistrationEmailResending
} from "../02-controllers/auth-controller";
import {
    authConfirmRegistrationBodyValidation,
    authEmailBodyValidation,
    authLoginBodyValidation,
    authNewPasswordBodyValidation,
    authRegistrationBodyValidation,
    authResendingEmailValidation,
} from "../../validators/auth-validator";
import {authBearerMiddleware} from "../../middlewares/auth-bearer-middleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {reqIpCounterMiddleware} from "../../middlewares/req-ip-counter-middleware";

export const authRouter = Router()

authRouter.post('/login',
    reqIpCounterMiddleware,
    authLoginBodyValidation,
    errorsValidationResultMiddleware,
    loginUser)

authRouter.get('/me',
    authBearerMiddleware,
    getUserInfo)

authRouter.post('/registration',
    reqIpCounterMiddleware,
    authRegistrationBodyValidation,
    errorsValidationResultMiddleware,
    userRegistration)

authRouter.post('/registration-confirmation',
    reqIpCounterMiddleware,
    authConfirmRegistrationBodyValidation,
    errorsValidationResultMiddleware,
    userRegistrationConfirmation)

authRouter.post('/registration-email-resending',
    reqIpCounterMiddleware,
    authResendingEmailValidation,
    errorsValidationResultMiddleware,
    userRegistrationEmailResending)

authRouter.post('/refresh-token',
    createNewTokensController)

authRouter.post('/logout',
    userLogout)

authRouter.post('/new-password',
    reqIpCounterMiddleware,
    authNewPasswordBodyValidation,
    errorsValidationResultMiddleware,
    newPasswordConfirmation)

authRouter.post('/password-recovery',
    reqIpCounterMiddleware,
    authEmailBodyValidation,
    errorsValidationResultMiddleware,
    passwordRecovery)