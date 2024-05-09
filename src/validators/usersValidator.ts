import {body, header} from "express-validator";

export const userBodyValidation = [
    body('login')
        .isString()
        .notEmpty()
        .isLength({min: 3, max: 10})
        .custom(value => {
            if (value.includes('   ')) {
                throw new Error()
            }
            return true
        })
        .matches('[a-zA-Z0-9_-]*$'),

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
        .custom(value => {
            if (value.includes('   ')) {
                throw new Error()
            }
            return true
        })
        .matches('[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
]