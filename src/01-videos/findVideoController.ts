import {Request, Response} from "express";
import {db} from "../db/db"
import {VideoType} from "../04-types/videoType";

export const FindVideoController = (req: Request<{id: string}>,
                                    res: Response<VideoType | {}>) => {
    const video = db.videos.findIndex(v => v.id === +req.params.id)
    if(video !== -1) {
        res.status(200).json(db.videos[video])
    } else {
        res.status(404)
    }
}