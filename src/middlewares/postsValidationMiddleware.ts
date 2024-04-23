import {body} from "express-validator";

export const postTitleValidator = body('title')
    .isString()
    .isLength({min: 1, max: 30})
    //.withMessage({errorsMessages: [{message: 'Incorrect title', field: 'title'}]})
export const postShortDescriptionValidator = body('shortDescription')
    .isString()
    .isLength({min: 1, max: 100})
    //.withMessage({errorsMessages: [{message: 'Incorrect shortDescription', field: 'shortDescription'}]})
export const postContentValidator = body('content')
    .isString()
    .isLength({min: 1, max: 1000})
    //.withMessage({errorsMessages: [{message: 'Incorrect content', field: 'content'}]})