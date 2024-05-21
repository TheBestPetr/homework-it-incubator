import {Express} from "express";
import {SETTINGS} from "./settings";
import {blogsRouter} from "./02-blogs/01-router/blogs-router";
import {postsRouter} from "./03-posts/01-router/posts-router";
import {testingRouter} from "./testing/testing-router";
import {videosRouter} from "./01-videos/videosRouter";
import {usersRouter} from "./04-users/01-router/users-router";
import {authRouter} from "./05-auth/01-router/auth-router";
import {commentsRouter} from "./06-comments/01-router/comments-router";

export const addRoutes = (app: Express) => {
    app.use(SETTINGS.PATH.BLOGS, blogsRouter)
    app.use(SETTINGS.PATH.POSTS, postsRouter)
    app.use(SETTINGS.PATH.TESTING, testingRouter)
    app.use(SETTINGS.PATH.VIDEOS, videosRouter)
    app.use(SETTINGS.PATH.USERS, usersRouter)
    app.use(SETTINGS.PATH.AUTH, authRouter)
    app.use(SETTINGS.PATH.COMMENTS, commentsRouter)
}