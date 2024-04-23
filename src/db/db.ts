import {VideoDbType} from "./video-db-type";
import {BlogDBType} from "./blog-db-type";
import {PostDBType} from "./post-db-type";

export type DBType = {
    videos: VideoDbType[]
    blogs: BlogDBType[]
    posts: PostDBType[]
}

export const db: DBType = {
    videos: [],
    blogs: [],
    posts: []
}

export const setDB = (dataset?: Partial<DBType>) => {
    if(!dataset) {
        db.videos = []
        db.blogs = []
        db.posts = []
        return
    }
    db.videos = dataset.videos || db.videos
    db.blogs = dataset.blogs || db.blogs
    db.posts = dataset.posts || db.posts
}