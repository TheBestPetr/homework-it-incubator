import {body, param} from "express-validator";
import {ObjectId} from "mongodb";
import {blogsService} from "../02-blogs/03-service/blogsService";

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
            const isBlogExist = await blogsService.findById(blogId as string)
            if (!isBlogExist) {
                throw new Error()
            }
            return true
        })
]

/*
export const postBlogIdValidatorParam = param('blogId')
    .custom(async (value) => {
        if (!new ObjectId(value)) {
            return 404
        }
        const isBlogExist = await blogsService.findById(value as string)
        if (!isBlogExist) {
            return 404
        }
        return true
    })*/
