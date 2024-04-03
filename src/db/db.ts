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
        return
    }
    db.videos = dataset.videos || db.videos
}