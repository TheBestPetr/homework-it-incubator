import express from "express"
import {SETTINGS} from "./settings";
import {testingRouter, videosRouter} from "./videos";

export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json('Hello from IT-INCUBATOR')
})

app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)