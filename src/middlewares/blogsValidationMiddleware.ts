import {body} from "express-validator"

    export const blogNameValidator = body('name')
        .isString()
        .isLength({min: 1, max: 15})
        .withMessage({errorsMessages: [{message: 'Incorrect name', field: 'name'}]})
    export const blogDescriptionValidator = body('description')
        .isString()
        .isLength({min: 1, max: 500})
        .withMessage({errorsMessages: [{message: 'Incorrect description', field: 'description'}]})
    export const blogWebsiteUrlValidator = body('websiteUrl')
        .isString()
        .isLength({min: 10, max: 100})
        .matches('https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
        .withMessage({errorsMessages: [{message: 'Incorrect websiteUrl', field: 'websiteUrl'}]})

