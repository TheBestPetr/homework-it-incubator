import {Request, Response} from "express"
import {db} from "../db/video.db"
import {OutputVideoType} from "../input-output-types/outputVideoType";

export const getVideosController = (req: Request, res: Response<OutputVideoType[]>) => {
    if (db.videos) {
        res.status(200).json(db.videos)
    } else {
        res.status(404).json()
    }
}