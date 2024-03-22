import {Request, Response} from "express"
import {db} from "../db/db"

export const DeleteVideoController = (req: Request<{id: string}>,
                                      res: Response) => {
    const deletedVideo = db.videos.filter(v => v.id !== +req.params.id)
    if(db.videos.length > deletedVideo.length) {
        db.videos = deletedVideo
        res.send(204)
    } else {
        res.send(404)
    }
}