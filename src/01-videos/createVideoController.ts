import {Request, Response} from "express"
import {InputVideoType, VideoType, Resolutions} from "../04-input-output-types/videoType"
import {ErrorsType} from "../04-input-output-types/errorsType"
import {VideoDbType} from "../db/db.type";
import {db} from "../db/db";
import {addDay} from "@formkit/tempo";

const inputValidation = (video: InputVideoType) => {
    const errors: ErrorsType = {
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

export const CreateVideoController = (req: Request<{}, {}, InputVideoType>,
                                      res: Response<VideoType | ErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }
    const createVideoDay = new Date().toISOString()
    const newVideo: VideoDbType = {
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
