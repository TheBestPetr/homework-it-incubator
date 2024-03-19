import {Request, Response} from "express";
import {db} from "../db/db";

export const DeleteBlogController = (req: Request<{id: string}>,
                                     res: Response) => {
    const deletedBlog = db.blogs.filter(b => b.id !== req.params.id)
    if (db.blogs.length > deletedBlog.length) {
        db.blogs = deletedBlog
        res.send(204)
    } else {
        res.send(404)
    }
}