import {Request, Response} from "express"
import {ErrorsType} from "../input-output-types/errorsType";
import {BlogType, InputBlogType} from "../input-output-types/blogType";
import {db} from "../db/db";

const inputValidation = (blog: InputBlogType) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    if (typeof blog.name !== "string" || blog.name.length > 16 || blog.name.length < 0) {
        errors.errorsMessages.push({
            message: 'Incorrect name',
            field: 'name'
        })
    }

    if (typeof blog.description !== "string" || blog.description.length > 501 || blog.description.length < 0) {
        errors.errorsMessages.push({
            message: 'Incorrect description',
            field: 'description'
        })
    }

    if (typeof blog.websiteUrl !== "string" || blog.websiteUrl.length > 101 || blog.websiteUrl.length < 0) {
        errors.errorsMessages.push({
            message: 'Incorrect websiteUrl',
            field: 'websiteUrl'
        })
    }
    return errors
}

export const CreateBlogController = (req: Request<{}, {}, InputBlogType>,
                                     res: Response<BlogType | ErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }
    const newBlog: BlogType = {
        ...req.body,
        id: Date.now() + Math.random().toString()
    }
    db.blogs.push(newBlog)
    res.status(201).json(newBlog)
}
