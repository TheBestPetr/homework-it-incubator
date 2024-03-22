import {Request, Response} from "express";
import {db} from "../db/db";

export const DeletePostController = (req: Request<{id: string}>,
                                     res: Response) => {
    const postToDelete = db.posts.filter(p => p.id !== req.params.id)
    if (db.posts.length > postToDelete.length) {
        db.posts = postToDelete
        res.send(204)
    } else {
        res.send(404)
    }
}
