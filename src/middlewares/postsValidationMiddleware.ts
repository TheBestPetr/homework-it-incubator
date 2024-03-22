import {body} from "express-validator";
//import {db} from "../db/db";

export const postTitleValidator = body('title').isString().isLength({min: 1, max: 30})
export const postShortDescriptionValidator = body('shortDescription').isString().isLength({min: 1, max: 100})
export const postContentValidator = body('content').isString().isLength({min: 1, max: 1000})
//export const postBlogIdValidator = body('blogId').isString().equals(db.blogs.findIndex(b => b.id === 'blogId').toString())