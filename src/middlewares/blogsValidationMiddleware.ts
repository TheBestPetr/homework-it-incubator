import {body, param} from "express-validator"
import {ObjectId} from "mongodb";
import {BlogsMongoDBRepository} from "../02-blogs/repository/blogs-mongoDB-repository";

export const blogNameValidator = body('name')
    .isString()
    .notEmpty()
    .custom(value => {
            if (value.includes('   ')) {
                throw new Error()
            }
            return true
        }
    )
    .isLength({min: 1, max: 15})
export const blogDescriptionValidator = body('description')
    .isString()
    .notEmpty()
    .custom(value => {
            if (value.includes('   ')) {
                throw new Error()
            }
            return true
        }
    )
    .isLength({min: 1, max: 500})
export const blogWebsiteUrlValidator = body('websiteUrl')
    .isString()
    .isLength({min: 10, max: 100})
    .matches('https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')

// export const blogIdValidator = param('id')
//     .custom(async (value) => {
//         if (!new ObjectId(value)) {
//             return 404
//         }
//         const isBlogExist = await BlogsMongoDBRepository.findById(value as string)
//         if (!isBlogExist) {
//             return 404
//         }
//         return true
//     })