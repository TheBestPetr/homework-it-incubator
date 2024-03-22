import {Request, Response} from "express";
import {db} from "../db/db";

export const TestingAllData = (req: Request, res: Response) => {
    db.videos = []
    db.blogs = []
    db.posts = []
    res.send(204)
}