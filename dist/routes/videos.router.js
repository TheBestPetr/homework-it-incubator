"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
let videos = [
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
];
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter.get('/', (req, res) => {
    if (videos) {
        res.status(200).send(videos);
    }
    else {
        res.send(404);
    }
});
exports.videosRouter.post('/', (req, res) => {
    let title = req.body.title;
    if (title.length > 40 || !title || typeof title !== 'string' || !title.trim()) {
        res.status(400).send({
            errorsMessages: [{
                    message: 'Incorrect title',
                    field: 'title'
                }]
        });
        return;
    }
    let minAgeRestriction = req.body.age;
    if (minAgeRestriction > 19 || minAgeRestriction <= 1) {
        res.status(400).send({
            errorsMessage: [{
                    message: "Incorrect age",
                    field: "age"
                }]
        });
        return;
    }
    let author = req.body.author;
    if (!author || author.length > 20 || typeof author !== 'string') {
        res.status(400).send({
            errorsMessage: [{
                    message: "Incorrect author",
                    field: "author"
                }]
        });
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
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.videosRouter.put('/:videoId', (req, res) => {
    let title = req.body.title;
    if (title.length > 40 || !title || typeof title !== 'string' || !title.trim()) {
        res.status(400).send({
            errorsMessages: [{
                    message: 'Incorrect title',
                    field: 'title'
                }]
        });
        return;
    }
    let author = req.body.author;
    if (!author || author.length > 20 || typeof author !== 'string') {
        res.status(400).send({
            errorsMessage: [{
                    message: "Incorrect author",
                    field: "author"
                }]
        });
        return;
    }
    let minAgeRestriction = req.body.age;
    if (minAgeRestriction > 19 || minAgeRestriction <= 1) {
        res.status(400).send({
            errorsMessage: [{
                    message: "Incorrect age",
                    field: "age"
                }]
        });
        return;
    }
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id);
    if (video) {
        video.title = req.body.title;
        video.id = req.body.id;
        video.author = req.body.author;
        video.age = req.body.age;
        res.status(204).send(video);
    }
    else {
        res.sendStatus(404);
    }
});
exports.videosRouter.get('/:videoId', (req, res) => {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id);
    if (video) {
        res.send(video);
    }
    else {
        res.send(404);
    }
});
exports.videosRouter.delete('/:videoId', (req, res) => {
    const id = +req.params.videoId;
    const newVideo = videos.filter(v => v.id !== id);
    if (newVideo.length < videos.length) {
        videos = newVideo;
        res.send(204);
    }
    else {
        res.send(404);
    }
});
