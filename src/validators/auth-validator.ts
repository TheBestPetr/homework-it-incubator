import {body} from "express-validator";
import {usersMongoQueryRepository} from "../04-users/04-repository/users-mongo-query-repository";

export const authLoginBodyValidation = [
    body('loginOrEmail')
        .isString()
        .notEmpty(),

    body('password')
        .isString()
        .notEmpty()
        .isLength({min: 6, max: 20})
]

export const authRegistrationBodyValidation = [
    body('login')
        .isString()
        .notEmpty()
        .isLength({min: 3, max: 10})
        .custom(async value => {
            const isExist = await usersMongoQueryRepository.findByLoginOrEmail(value)
            if (isExist) {
                throw new Error()
            }
            return true
        }),

    body('password')
        .isString()
        .notEmpty()
        .isLength({min: 6, max: 20})
        .custom(value => {
            if (value.includes('   ')) {
                throw new Error()
            }
            return true
        }),

    body('email')
        .isString()
        .notEmpty()
        .custom(async value => {
            const isExist = await usersMongoQueryRepository.findByLoginOrEmail(value)
            if (isExist) {
                throw new Error()
            }
            return true
        })
        .matches('[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
]

export const authConfirmRegistrationBodyValidation = [
    body('code')
        .isString()
        .notEmpty()
        .custom(async code => {
            const user = await usersMongoQueryRepository.findByEmailConfirmationCode(code)
            if (!user || user!.emailConfirmation.expirationDate! < new Date().toISOString() || user!.emailConfirmation.isConfirmed) {
                throw new Error()
            }
            return true
        })
]

export const authResendingEmailValidation = [
    body('email')
        .isString()
        .notEmpty()
        .custom(async email => {
            const user = await usersMongoQueryRepository.findByLoginOrEmail(email)
            if (!user || user!.emailConfirmation.isConfirmed) {
                throw new Error()
            }
            return true
        })
        .matches('[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
]
export const authEmailBodyValidation = [
    body('email')
        .isString()
        .notEmpty()
        .matches('[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
]

export const authNewPasswordBodyValidation = [
    body('newPassword')
        .isString()
        .notEmpty()
        .isLength({min: 6, max: 20})
        .custom(value => {
            if (value.includes('   ')) {
                throw new Error()
            }
            return true
        }),

    body('recoveryCode')
        .isString()
        .notEmpty()
        .custom(async code => {
            const user = await usersMongoQueryRepository.findByPasswordRecoveryCode(code)
            if (!user || user!.passwordRecovery!.expirationDate! < new Date().toISOString()) {
                throw new Error()
            }
            return true
        })
]