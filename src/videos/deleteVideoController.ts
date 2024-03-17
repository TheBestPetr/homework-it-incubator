import {Request, Response} from "express"
import {db} from "../db/video.db"

export const deleteVideoController = (req: Request, res: Response) => {
    const id = +req.params.id
    const deletedVideo = db.videos.filter(v => v.id !== id)
    if(db.videos.length > deletedVideo.length) {
        db.videos = deletedVideo
        res.send(204)
    } else {
        res.send(404)
    }
}