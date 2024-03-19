import {Request, Response} from "express";
import {db} from "../db/db"
import {VideoType} from "../input-output-types/videoType";

export const FindVideoController = (req: Request<{id: string}>,
                                    res: Response<VideoType | {}>) => {
    const video = db.videos.findIndex(v => v.id === +req.params.id)
    if(video) {
        res.status(200).json(video)
    } else {
        res.status(404)
    }
}