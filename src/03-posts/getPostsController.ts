import {Request, Response} from "express";
import {PostType} from "../04-input-output-types/postType";
import {db} from "../db/db";

export const GetPostsController = (req: Request,
                                   res: Response<PostType[]>) => {
    if (db.posts) {
        res.status(200).json(db.posts)
    } else {
        res.sendStatus(404)
    }
}