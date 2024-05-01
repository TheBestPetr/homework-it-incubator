import {body} from "express-validator";
import {ObjectId} from "mongodb";
import {blogsMongoQueryRepository} from "../02-blogs/04-repository/blogsMongoQueryRepository";

export const postBodyValidation = [
    body('title')
        .isString()
        .notEmpty()
        .custom(value => {
                if (value.includes('   ')) {
                    throw new Error()
                }
                return true
            }
        )
        .isLength({min: 1, max: 30}),

    body('shortDescription')
        .isString()
        .notEmpty()
        .custom(value => {
                if (value.includes('   ')) {
                    throw new Error()
                }
                return true
            }
        )
        .isLength({min: 1, max: 100}),

    body('content')
        .isString()
        .notEmpty()
        .custom(value => {
                if (value.includes('   ')) {
                    throw new Error()
                }
                return true
            }
        )
        .isLength({min: 1, max: 1000}),

    body('blogId')
        .isString()
        .notEmpty()
        .custom(async (blogId) => {
            if (!ObjectId.isValid(blogId)) {
                throw new Error()
            }
            const isBlogExist = await blogsMongoQueryRepository.findById(blogId)
            if (!isBlogExist) {
                throw new Error()
            }
            return true
        })
]