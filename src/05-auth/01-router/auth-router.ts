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
    authController.loginUser.bind(authController))

authRouter.get('/me',
    authBearerMiddleware,
    authController.getUserInfo.bind(authController))

authRouter.post('/registration',
    reqIpCounterMiddleware,
    authRegistrationBodyValidation,
    errorsValidationResultMiddleware,
    authController.userRegistration.bind(authController))

authRouter.post('/registration-confirmation',
    reqIpCounterMiddleware,
    authConfirmRegistrationBodyValidation,
    errorsValidationResultMiddleware,
    authController.userRegistrationConfirmation.bind(authController))

authRouter.post('/registration-email-resending',
    reqIpCounterMiddleware,
    authResendingEmailValidation,
    errorsValidationResultMiddleware,
    authController.userRegistrationEmailResending.bind(authController))

authRouter.post('/refresh-token',
    authController.createNewTokensController.bind(authController))

authRouter.post('/logout',
    authController.userLogout.bind(authController))

authRouter.post('/new-password',
    reqIpCounterMiddleware,
    authNewPasswordBodyValidation,
    errorsValidationResultMiddleware,
    authController.newPasswordConfirmation.bind(authController))

authRouter.post('/password-recovery',
    reqIpCounterMiddleware,
    authEmailBodyValidation,
    errorsValidationResultMiddleware,
    authController.passwordRecovery.bind(authController))