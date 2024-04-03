import express from "express"
import {SETTINGS} from "./settings";
import {videosRouter} from "./01-videos/videosRouter";
import {testingRouter} from "./testing/testingRouter";
import {blogsRouter} from "./blogs/blogsRouter";
import {postsRouter} from "./03-posts/postsRouter";

export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json('Hello from IT-INCUBATOR')
})