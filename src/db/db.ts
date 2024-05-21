import {VideoDbType} from "../types/db-types/video-db-type";
import {BlogDBType} from "../types/db-types/blog-db-type";
import {PostDBType} from "../types/db-types/post-db-type";
import {UserDbType} from "../types/db-types/user-db-type";
import {CommentDbType} from "../types/db-types/comment-db-type";

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