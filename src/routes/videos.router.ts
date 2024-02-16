import {Request, Response, Router} from 'express'
import {HTTP_STATUSES} from "../HTTP-STATUSES/HTTP.STATUSES";
export let videos = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        age: null,
        createdAt: "2024-02-04T14:33:25.854Z",
        publicationDate: "2024-02-04T14:33:25.854Z",
        availableResolutions: [
            "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"
        ]
    }
]

export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    if(videos) {
        res.status(HTTP_STATUSES.OK_200).send(videos)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

videosRouter.post('/', (req: Request, res: Response) => {
    let title  = req.body.title;
    if (title.length > 40 || !title || typeof title !== 'string' || !title.trim()) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                message: 'Incorrect title',
                field: 'title'
            }]
        })
        return;
    }
    let minAgeRestriction = req.body.age;
    if (minAgeRestriction > 19 || minAgeRestriction <= 1) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessage: [{
                message: "Incorrect age",
                field: "age"
            }]
        })
        return;
    }
    let author = req.body.author;
    if (!author || author.length > 20 || typeof author !== 'string') {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessage: [{
                message: "Incorrect author",
                field: "author"
            }]
        })
        return;
    }

    const newVideo = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        age: req.body.age,
        createdAt: "2024-02-04T14:33:25.854Z",
        publicationDate: "2024-02-04T14:33:25.854Z",
        availableResolutions: [
            "P144"
        ]
    }
    videos.push(newVideo)
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
})

videosRouter.put('/:videoId', (req: Request, res: Response) => {
    let title = req.body.title;
    if (title.length > 40 || !title || typeof title !== 'string' || !title.trim()) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                message: 'Incorrect title',
                field: 'title'
            }]
        })
        return;
    }
    let author = req.body.author;
    if (!author || author.length > 20 || typeof author !== 'string') {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessage: [{
                message: "Incorrect author",
                field: "author"
            }]
        })
        return;
    }
    let minAgeRestriction = req.body.age;
    if (minAgeRestriction > 19 || minAgeRestriction <= 1) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessage: [{
                message: "Incorrect age",
                field: "age"
            }]
        })
        return;
    }
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        video.title = req.body.title;
        video.id = req.body.id;
        video.author = req.body.author;
        video.age = req.body.age;
        res.status(HTTP_STATUSES.NO_CONTENT_204).send(video)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

videosRouter.get('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

videosRouter.delete('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const newVideo = videos.filter(v => v.id !== id)
    if (newVideo.length < videos.length) {
        videos = newVideo
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})
