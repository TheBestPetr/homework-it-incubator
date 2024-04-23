import {Express} from "express";
import {SETTINGS} from "./settings";
import {blogsRouter} from "./02-blogs/blogsRouter";
import {postsRouter} from "./03-posts/postsRouter";
import {testingRouter} from "./testing/testingRouter";
import {videosRouter} from "./01-videos/videosRouter";

export const addRoutes = (app: Express) => {
    app.use(SETTINGS.PATH.BLOGS, blogsRouter)
    app.use(SETTINGS.PATH.POSTS, postsRouter)
    app.use(SETTINGS.PATH.TESTING, testingRouter)
    app.use(SETTINGS.PATH.VIDEOS, videosRouter)
}