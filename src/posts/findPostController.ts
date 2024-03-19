import {Request, Response} from "express";
import {PostType} from "../input-output-types/postType";
import {db} from "../db/db";

export const FindPostController = (req: Request<{id: string}>,
                                   res: Response<PostType | {}>) => {
    const post = db.posts.findIndex(p => p.id === req.params.id)
    if (post) {
        res.status(200).json(post)
    } else {
        res.sendStatus(404)
    }
}