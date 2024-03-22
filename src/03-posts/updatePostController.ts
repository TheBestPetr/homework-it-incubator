import {Request, Response} from "express";
import {InputPostType, PostType} from "../04-input-output-types/postType";
import {db} from "../db/db";

export const UpdatePostController = (req: Request<{id: string}, {}, InputPostType>,
                                     res: Response<PostType>) => {
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