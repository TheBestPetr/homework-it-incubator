import {body} from "express-validator";
import {ObjectId} from "mongodb";
import {blogCollection} from "../db/mongo-db";
import {BlogsMongoDBRepository} from "../02-blogs/repository/blogs-mongoDB-repository";

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
    .custom (async (value) => {
        if (!new ObjectId(value)) {
            throw new Error()
        }
        const isBlogExist = await BlogsMongoDBRepository.findById(value as string)
        if (!isBlogExist) {
            throw new Error()
        }
        return true
    })

// export const postIdValidator = param('id')
//     .customSanitizer(value => new ObjectId(value))