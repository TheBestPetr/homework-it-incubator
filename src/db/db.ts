import {VideoDbType} from "./video-db-type";
import {BlogDBType} from "./blog-db-type";
import {PostDBType} from "./post-db-type";
import {UserDbType} from "./user-db-type";

export type DBType = {
    videos: VideoDbType[]
    blogs: BlogDBType[]
    posts: PostDBType[]
    users: UserDbType[]
}

export const db: DBType = {
    videos: [],
    blogs: [],
    posts: [],
    users: []
}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.videos = []
        db.blogs = []
        db.posts = []
        db.users = []
        return
    }
    db.videos = dataset.videos || db.videos
    db.blogs = dataset.blogs || db.blogs
    db.posts = dataset.posts || db.posts
    db.users = dataset.users || db.users
}