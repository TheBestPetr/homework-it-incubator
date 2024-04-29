import {body, param} from "express-validator"
import {ObjectId} from "mongodb";
import {blogsMongoRepository} from "../02-blogs/04-repository/blogsMongoRepository";

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
// export const blogIdValidator = param('id')
//     .custom(async (value) => {
//         if (!new ObjectId(value)) {
//             return 404
//         }
//         const isBlogExist = await blogsMongoRepository.findById(value)
//         if (!isBlogExist) {
//             return 404
//         }
//         return true
//     })