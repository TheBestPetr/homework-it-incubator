import {body, param} from "express-validator";
import {ObjectId} from "mongodb";

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
    .custom(value => new ObjectId(value))

// export const postIdValidator = param('id')
//     .customSanitizer(value => new ObjectId(value))