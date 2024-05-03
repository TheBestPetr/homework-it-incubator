import {body} from "express-validator"

export const blogBodyValidation = [
    body('name')
        .isString()
        .notEmpty()
        .custom(value => {
                if (value.includes('   ')) {
                    throw new Error()
                }
                return true
            }
        )
        .isLength({min: 1, max: 15}),

    body('description')
        .isString()
        .notEmpty()
        .custom(value => {
                if (value.includes('   ')) {
                    throw new Error()
                }
                return true
            }
        )
        .isLength({min: 1, max: 500}),

    body('websiteUrl')
        .isString()
        .isLength({min: 10, max: 100})
        .matches('https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
]