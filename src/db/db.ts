import {VideoDbType} from "./video-db-type";
import {BlogDBType} from "./blog-db-type";
import {PostDBType} from "./post-db-type";
import {UserDbType} from "./user-db-type";
import {CommentDbType} from "./comment-db-type";

export type DBType = {
    videos: VideoDbType[]
    blogs: BlogDBType[]
    posts: PostDBType[]
    users: UserDbType[]
    comments: CommentDbType[]
}

export const db: DBType = {
    videos: [],
    blogs: [],
    posts: [],
    users: [],
    comments: []
}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.videos = []
        db.blogs = []
        db.posts = []
        db.users = []
        db.comments = []
        return
    }
    db.videos = dataset.videos || db.videos
    db.blogs = dataset.blogs || db.blogs
    db.posts = dataset.posts || db.posts
    db.users = dataset.users || db.users
    db.comments = dataset.comments || db.comments
}