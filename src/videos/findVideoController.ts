import {Request, Response} from "express";
import {db} from "../db/video.db"
import {OutputVideoType} from "../input-output-types/outputVideoType";

export const findVideoController = (req: Request<{id: string}>, res: Response<OutputVideoType | {}>) => {
    const video = db.videos.find(v => v.id === +req.params.id)
    if(video) {
        res.status(200).json(video)
    } else {
        res.send(404)
    }
}