import {Request, Response} from "express";
import {db} from "../db/db";
import {
    blogCollection,
    commentCollection, deviceCollection,
    postCollection,
    refreshTokenBlacklistCollection, reqCountCollection,
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
    deviceCollection.deleteMany()
    refreshTokenBlacklistCollection.deleteMany()
    deviceCollection.deleteMany()
    reqCountCollection.deleteMany()
    res.status(204).send('you delete all data')
}