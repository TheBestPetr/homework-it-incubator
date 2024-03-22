import {Request, Response} from "express";
import {PostType} from "../04-input-output-types/postType";
import {db} from "../db/db";

export const FindPostController = (req: Request<{id: string}>,
                                   res: Response<PostType | {}>) => {
    const post = db.posts.findIndex(p => p.id === req.params.id)
    if (post !== -1) {
        res.status(200).json(db.posts[post])
    } else {
        res.sendStatus(404)
    }
}