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
            field: 'author'
        })
    }

    if (typeof video.minAgeRestriction !== "number" || video.minAgeRestriction < 0 || video.minAgeRestriction > 19) {
        errors.errorsMessages.push({
            message: 'Incorrect age',
            field: 'minAgeRestriction'
        })
    }

    if (video.canBeDownloaded) {
        if (typeof video.canBeDownloaded !== "boolean") {
            errors.errorsMessages.push({
                message: 'Incorrect value(only boolean type)',
                field: 'canBeDownloaded'
            })
        }
    }

    if (video.publicationDate) {
        if(typeof video.publicationDate !== "string") {
            errors.errorsMessages.push({
                message: 'Incorrect date',
                field: 'publicationDate'
            })
        }
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
    const videoToUpdate = db.videos.findIndex(v => v.id === +req.params.id)
    if (videoToUpdate) {
        db.videos[videoToUpdate].title = req.body.title
        db.videos[videoToUpdate].author = req.body.author
        db.videos[videoToUpdate].availableResolutions = req.body.availableResolutions
        db.videos[videoToUpdate].canBeDownloaded = req.body.canBeDownloaded || false
        db.videos[videoToUpdate].minAgeRestriction = req.body.minAgeRestriction
        db.videos[videoToUpdate].publicationDate = new Date().toISOString()
        res.status(204).json(db.videos[videoToUpdate])
    } else {
        res.sendStatus(404)
    }
}