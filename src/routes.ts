import {Express} from "express";
import {SETTINGS} from "./settings";
import {blogsRouter} from "./02-blogs/01-router/blogsRouter";
import {postsRouter} from "./03-posts/01-router/postsRouter";
import {testingRouter} from "./testing/testingRouter";
import {videosRouter} from "./01-videos/videosRouter";
import {usersRouter} from "./04-users/01-router/usersRouter";
import {authRouter} from "./05-auth/01-router/authRouter";
import {commentsRouter} from "./06-comments/01-router/commentsRouter";

export const addRoutes = (app: Express) => {
    app.use(SETTINGS.PATH.BLOGS, blogsRouter)
    app.use(SETTINGS.PATH.POSTS, postsRouter)
    app.use(SETTINGS.PATH.TESTING, testingRouter)
    app.use(SETTINGS.PATH.VIDEOS, videosRouter)
    app.use(SETTINGS.PATH.USERS, usersRouter)
    app.use(SETTINGS.PATH.AUTH, authRouter)
    app.use(SETTINGS.PATH.COMMENTS, commentsRouter)
}