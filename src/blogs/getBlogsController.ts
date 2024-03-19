import {Request, Response} from "express"
import {db} from "../db/db";
import {BlogType} from "../input-output-types/blogType";

export const GetBlogsController = (req: Request, res: Response<BlogType[]>) => {
    if (db.blogs) {
        res.status(200).json(db.blogs)
    } else {
        res.status(404)
    }
}

