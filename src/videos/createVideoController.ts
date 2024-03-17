import {Request, Response} from "express"
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output-types/outputVideoType"
import {OutputErrorsType} from "../input-output-types/outputErrorsType"
import {VideoDBType} from "../db/video.db.type";
import {db} from "../db/video.db";
import {addDay} from "@formkit/tempo";

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
            message: 'Incorrect author',
            field: 'author'
        })
    }


    for(const resolution of video.availableResolutions) {
        const isInclude = Object.values(Resolutions).includes(resolution)



    if(!isInclude) {
        errors.errorsMessages.push({
            message: 'Incorrect Resolutions',
            field: 'availableResolutions'
        })
        return errors
    }}
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
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createVideoDay,
        publicationDate: addDay(createVideoDay, 1).toISOString(),
        availableResolutions: [...req.body.availableResolutions]
    }
    db.videos.push(newVideo)
    res.status(201).json(newVideo)
}
