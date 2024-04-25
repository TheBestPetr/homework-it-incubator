import {body} from "express-validator";

export const postTitleValidator = body('title')
    .isString()
    .notEmpty()
    .custom(value => {
            if (value.includes('   ')) {
                throw new Error()
            }
            return true
        }
    )
    .isLength({min: 1, max: 30})
export const postShortDescriptionValidator = body('shortDescription')
    .isString()
    .notEmpty()
    .custom(value => {
            if (value.includes('   ')) {
                throw new Error()
            }
            return true
        }
    )
    .isLength({min: 1, max: 100})
export const postContentValidator = body('content')
    .isString()
    .notEmpty()
    .custom(value => {
            if (value.includes('   ')) {
                throw new Error()
            }
            return true
        }
    )
    .isLength({min: 1, max: 1000})
export const postBlogIdValidator = body('blogId')
    .isString()
    .notEmpty()