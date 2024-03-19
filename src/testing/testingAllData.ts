import {Request, Response} from "express";
import {db} from "../db/db";

export const TestingAllData = (req: Request, res: Response) => {
    db.videos = []
    res.send(204)
}