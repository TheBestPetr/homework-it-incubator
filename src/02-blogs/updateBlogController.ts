import {Request, Response} from "express";
import {BlogType, InputBlogType} from "../04-input-output-types/blogType";
import {db} from "../db/db";

export const UpdateBlogController = (req: Request<{id: string}, {}, InputBlogType>,
                                     res: Response<BlogType>) => {
    const blogToUpdate = db.blogs.findIndex(b => b.id === req.params.id)
    if (blogToUpdate !== -1) {
        db.blogs[blogToUpdate].name = req.body.name
        db.blogs[blogToUpdate].description = req.body.description
        db.blogs[blogToUpdate].websiteUrl = req.body.websiteUrl
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
    return
}