import {Request, Response} from "express";
import {db} from "../db/db";
import {
    blogCollection,
    commentCollection,
    postCollection,
    refreshTokenBlacklistCollection,
    userCollection
} from "../db/mongo-db";

export const TestingAllData = (req: Request, res: Response) => {
    db.videos = []
    db.blogs = []
    db.posts = []
    blogCollection.deleteMany()
    postCollection.deleteMany()
    userCollection.deleteMany()
    commentCollection.deleteMany()
    refreshTokenBlacklistCollection.deleteMany()
    res.status(204).send('you delete all data')
}