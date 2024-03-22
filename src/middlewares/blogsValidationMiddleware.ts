import {body} from "express-validator"

    export const blogNameValidator = body('name').isString().isLength({min: 1, max: 15})
    export const blogDescriptionValidator = body('description').isString().isLength({min: 1, max: 500})
    export const blogWebsiteUrlValidator = body('websiteUrl').isString().isLength({min: 10, max: 100}).matches('https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')