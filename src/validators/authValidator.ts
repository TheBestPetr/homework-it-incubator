import {body} from "express-validator";
import {usersMongoRepository} from "../04-users/04-repository/usersMongoRepository";

export const authBodyValidation = [
    body('loginOrEmail')
        .isString()
        .custom(async value => {
            const isExist = await usersMongoRepository.isLoginOrEmailExist(value)
            if (!isExist) {
                throw new Error()
            }
            return true
        }),

    body('password')
        .isString()
        .isLength({min: 6, max: 20})
]

