import {Request, Response} from "express"
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output-types/outputVideoType"
import {OutputErrorsType} from "../input-output-types/outputErrorsType"
import {VideoDBType} from "../db/video.db.type";
import {db} from "../db/video.db";

const inputValidation = (video: InputVideoType) => {
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

    if(!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'Incorrect Resolutions',
            field: 'availableResolutions'
        })
    }
    return errors
}

export type ParamType = {
    id: string
}

export type QueryType = {
    search?: string
}

export const createVideoController = (req: Request<{}, {}, InputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }
    const createVideoDay = new Date().toISOString()
    const newVideo: VideoDBType = {
        id: Date.now() + Math.random(),
        author: req.body.author,
        title: req.body.title,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: createVideoDay,
        publicationDate: createVideoDay/*.setDate(1)*/,
        availableResolution: req.body.availableResolutions
    }
    db.videos = [...db.videos, newVideo]
    res.status(201).json(newVideo)
}
