import {Request, Response} from "express";
import {CreateVideoType, Resolutions} from "../input-output-types/outputVideoType";
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

    if (video.minAgeRestriction < 0 || video.minAgeRestriction > 19) {
        errors.errorsMessages.push({
            message: 'Incorrect age',
            field: 'minAgeRestriction'
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

export const updateVideoController = (req: Request, res: Response) => {
    const errors = inputValidation(req.body)
    if(errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }
    const id = +req.params.id
    const videoToUpdate = db.videos.find(v => v.id === id)
    if (!videoToUpdate) {
        res.status(404).json()
    } else {
        db.videos[id].title = req.body.title
        db.videos[id].author = req.body.author
        db.videos[id].availableResolution = req.body.availableResolution
        db.videos[id].canBeDownloaded = false
        db.videos[id].minAgeRestriction = req.body.minAgeRestriction
        db.videos[id].publicationDate = new Date().toISOString()
        res.status(204).json(videoToUpdate)
    }
}