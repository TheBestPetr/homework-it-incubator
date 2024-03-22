import {Request, Response} from "express";
import {BlogType} from "../04-input-output-types/blogType";
import {db} from "../db/db";

export const FindBlogController = (req: Request<{id: string}>,
                                   res: Response<BlogType | {}>) => {
    const blog = db.blogs.findIndex(b => b.id === req.params.id)
    if (blog !== -1) {
        res.status(200).json(db.blogs[blog])
    } else {
        res.sendStatus(404)
    }
}