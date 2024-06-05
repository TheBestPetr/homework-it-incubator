import {SETTINGS} from "../settings"
import {Collection, Db, MongoClient} from "mongodb"
import {BlogDBType} from "../types/db-types/blog-db-type"
import {PostDBType} from "../types/db-types/post-db-type"
import {UserDbType} from "../types/db-types/user-db-type"
import {CommentDbType} from "../types/db-types/comment-db-type"
import {RefreshTokenBlacklistDbType} from "../types/applicationTypes/refresh-token-blacklist-db-type"
import {DeviceDBType} from "../types/db-types/device-db-type";
import {ReqDbType} from "../types/applicationTypes/req-db-type";
import mongoose from "mongoose";

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const db: Db = client.db(SETTINGS.DB_NAME)

export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.DB_COLLECTION_NAME.BLOG)
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.DB_COLLECTION_NAME.POST)
export const userCollection: Collection<UserDbType> = db.collection<UserDbType>(SETTINGS.DB_COLLECTION_NAME.USER)
export const commentCollection: Collection<CommentDbType> = db.collection<CommentDbType>(SETTINGS.DB_COLLECTION_NAME.COMMENT)
export const deviceCollection: Collection<DeviceDBType> = db.collection<DeviceDBType>(SETTINGS.DB_COLLECTION_NAME.DEVICE)
export const refreshTokenBlacklistCollection: Collection<RefreshTokenBlacklistDbType> = db.collection<RefreshTokenBlacklistDbType>(SETTINGS.DB_COLLECTION_NAME.REFRESH_TOKEN_BLACKLIST)
export const reqCountCollection: Collection<ReqDbType> = db.collection<ReqDbType>(SETTINGS.DB_COLLECTION_NAME.REQ_COUNTER)

export const connectToDB = async () => {
    try {
       // await mongoose.connect(SETTINGS.MONGO_URL)
        await client.connect()
        console.log('Connection to db - Success')
        return true
    } catch (e) {
        console.log(e)
        //await mongoose.disconnect()
        await client.close()
        return false
    }
}