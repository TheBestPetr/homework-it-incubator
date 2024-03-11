import {Request, Response} from "express";
import {db} from "../db/video.db";

export const testingVideoController = (req: Request, res: Response) => {
    db.videos = []
    res.status(204).json('You delete all data')
}