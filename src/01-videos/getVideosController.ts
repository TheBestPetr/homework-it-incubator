import {Request, Response} from "express"
import {db} from "../db/db"
import {VideoType} from "../types/videoType";

export const GetVideosController = (req: Request,
                                    res: Response<VideoType[]>) => {
    if (db.videos) {
        res.status(200).json(db.videos)
    } else {
        res.status(404).json()
    }
}