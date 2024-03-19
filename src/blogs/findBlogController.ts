import {Request, Response} from "express";
import {BlogType} from "../input-output-types/blogType";
import {db} from "../db/db";

export const FindBlogController = (req: Request<{id: string}>,
                                   res: Response<BlogType | {}>) => {
    const blog = db.blogs.findIndex(b => b.id === req.params.id)
    if (blog) {
        res.status(200).json(blog)
    } else {
        res.status(404)
    }
}