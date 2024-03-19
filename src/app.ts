import express from "express"
import {SETTINGS} from "./settings";
import {videosRouter} from "./videos/videosRouter";
import {testingRouter} from "./testing/testingRouter";
import {blogsRouter} from "./blogs/blogsRouter";
import {postsRouter} from "./posts/postsRouter";

export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json('Hello from IT-INCUBATOR')
})

app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)