import {body} from "express-validator";

export const commentBodyValidation = [
    body('content')
        .isString()
        .notEmpty()
        .isLength({min: 20, max: 300})
        .custom(value => {
                if (value.includes('   ')) {
                    throw new Error()
                }
                return true
            }
        )
]