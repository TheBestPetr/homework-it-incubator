import {Request, Response} from "express";
import {InputPostType, PostType} from "../input-output-types/postType";
import {ErrorsType} from "../input-output-types/errorsType";
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

export const UpdatePostController = (req: Request<{id: string}, {}, InputPostType>,
                                     res: Response<PostType | ErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }
    const postToUpdate = db.posts.findIndex(p => p.id === req.params.id)
    if (postToUpdate !== -1) {
        db.posts[postToUpdate].title = req.body.title
        db.posts[postToUpdate].shortDescription = req.body.shortDescription
        db.posts[postToUpdate].content = req.body.content
        db.posts[postToUpdate].blogId = req.body.blogId
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}