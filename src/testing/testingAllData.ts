import {Request, Response} from "express";
import {db} from "../db/db";
import {blogCollection, postCollection} from "../db/mongo-db";

export const TestingAllData = (req: Request, res: Response) => {
    db.videos = []
    db.blogs = []
    db.posts = []
    blogCollection.deleteMany()
    postCollection.deleteMany()
    res.sendStatus(204)
}