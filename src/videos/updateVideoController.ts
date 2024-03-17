import {Request, Response} from "express";
import {CreateVideoType, OutputVideoType, Resolutions, UpdateVideoType} from "../input-output-types/outputVideoType";
import {OutputErrorsType} from "../input-output-types/outputErrorsType";
import {db} from "../db/video.db";

const inputValidation = (video: CreateVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    if (typeof video.title !== 'string' || video.title.length > 40 || !video.title.trim()) {
        errors.errorsMessages.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }

    if (typeof video.author !== 'string' || video.author.length > 20 || !video.author.trim()) {
        errors.errorsMessages.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }

    if (typeof video.minAgeRestriction !== "number" || video.minAgeRestriction < 0 || video.minAgeRestriction > 19) {
        errors.errorsMessages.push({
            message: 'Incorrect age',
            field: 'minAgeRestriction'
        })
    }

    if (typeof video.canBeDownloaded !== "boolean") {
        errors.errorsMessages.push({
            message: 'Incorrect value(only boolean type)',
            field: 'canBeDownloaded'
        })
    }

    if(!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'Incorrect Resolutions',
            field: 'availableResolutions'
        })
    }
    return errors
}

export const updateVideoController = (req: Request<{id: string}, {}, UpdateVideoType>,
                                      res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if(errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }
    const id = +req.params.id
    const videoToUpdate = db.videos.findIndex(v => v.id === id)
    if (videoToUpdate) {
        db.videos[videoToUpdate].title = req.body.title
        db.videos[videoToUpdate].author = req.body.author
        db.videos[videoToUpdate].availableResolutions = req.body.availableResolutions
        db.videos[videoToUpdate].canBeDownloaded = req.body.canBeDownloaded
        db.videos[videoToUpdate].minAgeRestriction = req.body.minAgeRestriction
        db.videos[videoToUpdate].publicationDate = new Date().toISOString()
        res.status(204).json(db.videos[videoToUpdate])
    } else {
        res.status(404).json()
    }
}