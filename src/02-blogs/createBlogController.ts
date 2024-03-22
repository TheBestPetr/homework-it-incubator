import {Request, Response} from "express"
import {BlogType, InputBlogType} from "../04-input-output-types/blogType";
import {db} from "../db/db";

export const CreateBlogController = (req: Request<{}, {}, InputBlogType>,
                                     res: Response<BlogType>) => {
    const newBlog: BlogType = {
        id: Date.now() + Math.random().toString(),
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }
    db.blogs.push(newBlog)
    res.status(201).json(newBlog)
}