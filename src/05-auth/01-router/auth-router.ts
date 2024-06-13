import {Router} from "express";
import {authController} from "../02-controllers/auth-controller";
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
    authController.loginUser)

authRouter.get('/me',
    authBearerMiddleware,
    authController.getUserInfo)

authRouter.post('/registration',
    reqIpCounterMiddleware,
    authRegistrationBodyValidation,
    errorsValidationResultMiddleware,
    authController.userRegistration)

authRouter.post('/registration-confirmation',
    reqIpCounterMiddleware,
    authConfirmRegistrationBodyValidation,
    errorsValidationResultMiddleware,
    authController.userRegistrationConfirmation)

authRouter.post('/registration-email-resending',
    reqIpCounterMiddleware,
    authResendingEmailValidation,
    errorsValidationResultMiddleware,
    authController.userRegistrationEmailResending)

authRouter.post('/refresh-token',
    authController.createNewTokensController)

authRouter.post('/logout',
    authController.userLogout)

authRouter.post('/new-password',
    reqIpCounterMiddleware,
    authNewPasswordBodyValidation,
    errorsValidationResultMiddleware,
    authController.newPasswordConfirmation)

authRouter.post('/password-recovery',
    reqIpCounterMiddleware,
    authEmailBodyValidation,
    errorsValidationResultMiddleware,
    authController.passwordRecovery)