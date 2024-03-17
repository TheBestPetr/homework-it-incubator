import {Request, Response} from "express";
import {db} from "../db/video.db";

export const testingAllData = (req: Request, res: Response) => {
    db.videos = []
    res.send(204)
}