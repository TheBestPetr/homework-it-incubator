import {Request, Response, Router} from 'express'
import {HTTP_STATUSES} from "../HTTP-STATUSES/HTTP.STATUSES";
import {db} from "../video-db/video-db";
import {AvailableResolutionsEnum} from "../enums/AvailableResolutionsEnum";

export const videosRouter = Router({})
export const testingRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    if (db.videos) {
        res.status(HTTP_STATUSES.OK_200).send(db.videos)
    } else {
        res.status(HTTP_STATUSES.NOT_FOUND_404)
    }
})

videosRouter.post('/', (req: Request<{}, {}, {id: number, title: string, author: string, minAgeRestriction: number, availableResolutions: Array<AvailableResolutionsEnum>}>,
                        res: Response) => {
    const title = req.body.title
    if (!title || title.length > 40 || !title.trim()) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            'errors messages': [{
                'message': 'incorrect title',
                'field': 'title'
            }]
        })
        return
    }
    const author = req.body.author
    if (!author || author.length > 20 || !author.trim()) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            'errors messages': [{
                'message': 'incorrect author',
                'field': 'author'
            }]
        })
        return
    }
    const availableResolutions = req.body.availableResolutions
    for (let i = 0; i < availableResolutions.length; i++) {
        if (!Object.values(AvailableResolutionsEnum).includes(availableResolutions[i])) {
            res.status(400).send({
                'errors messages': [{
                    'message': 'incorrect resolution',
                    'field': 'availableResolutions'
                }]
            })
            return
        }
    }

    const newVideo = {
        id: +new Date(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: "2024-02-04T14:33:25.854Z",
        publicationDate: "2024-02-05T14:33:25.854Z",
        availableResolutions: req.body.availableResolutions
    }
    db.videos.push(newVideo)
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
})

videosRouter.get('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = db.videos.find(v => v.id === id)
    if (video) {
        res.status(HTTP_STATUSES.OK_200).send(video)
    } else {
        res.status(HTTP_STATUSES.NOT_FOUND_404)
    }
})

videosRouter.put('/:videoId', (req: Request, res: Response) => {
    const title = req.body.title
    if (!title || typeof title !== 'string' || title.length > 40 || !title.trim()) {
        res.status(400).send({
            'errors messages': [{
                'message': 'incorrect title',
                'field': 'title'
            }]
        })
        return
    }
    const author = req.body.author
    if (!author || author.length > 20 || typeof author !== 'string' || !author.trim()) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            'errors messages': [{
                'message': 'incorrect author',
                'field': 'author'
            }]
        })
        return
    }
    const age = req.body.minAgeRestriction
    if (!age || age < 0 || age > 19 || typeof age !== 'number') {
        res.status(400).send({
            'errors messages': [{
                'message': 'incorrect age',
                'field': 'minAgeRestriction'
            }]
        })
        return
    }

    const id = +req.params.videoId
    const video = db.videos.find(v => v.id === id)
    if (video) {
        video.title = req.body.title
        video.author = req.body.author
        video.availableResolutions = req.body.availableResolutions
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = "2024-02-04T14:33:25.854Z"
        res.status(HTTP_STATUSES.NO_CONTENT_204).send(video)
    } else {
     res.status(HTTP_STATUSES.NOT_FOUND_404)
    }
})

videosRouter.delete('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    //const newVideo = db.videos.filter(v => v.id !== id)
    const videoToDelete = db.videos.splice(id, 1)
    if (videoToDelete.length < db.videos.length) {
        db.videos = videoToDelete
        res.status(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.status(HTTP_STATUSES.NOT_FOUND_404)
    }
})

testingRouter.delete('/', (req: Request, res: Response) => {
    db.videos = []
    res.status(HTTP_STATUSES.NO_CONTENT_204).send('You delete all videos')
})