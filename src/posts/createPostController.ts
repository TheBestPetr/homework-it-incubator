import {Request, Response} from "express";
import {ErrorsType} from "../input-output-types/errorsType";
import {InputPostType, PostType} from "../input-output-types/postType";
import {db} from "../db/db";

const inputValidation = (post: InputPostType) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    if (typeof post.title !== "string" || post.title.length > 31 || post.title.length < 0) {
        errors.errorsMessages.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }

    if (typeof post.shortDescription !== "string" || post.shortDescription.length > 101 || post.shortDescription.length < 0) {
        errors.errorsMessages.push({
            message: 'Incorrect description',
            field: 'description'
        })
    }

    if (typeof post.content !== "string" || post.content.length > 1001 || post.content.length < 0) {
        errors.errorsMessages.push({
            message: 'Incorrect content',
            field: 'content'
        })
    }

    if (typeof post.blogId !== "string") {
        errors.errorsMessages.push({
            message: 'Incorrect id',
            field: 'blogId'
        })
    }
    return errors
}

export const CreatePostController = (req: Request<{}, {}, InputPostType>,
                                     res: Response<PostType | ErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res.status(404).json(errors)
        return
    }
    const newPost: PostType = {
        ...req.body,
        id: Date.now() + Math.random().toString(),
        blogName: new Date().toString()
    }
    db.posts.push(newPost)
    res.status(201).json(newPost)
}