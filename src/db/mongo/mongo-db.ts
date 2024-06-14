import {SETTINGS} from "../../settings"
import {BlogDBType} from "../../types/db-types/blog-db-type"
import {PostDBType} from "../../types/db-types/post-db-type"
import {UserDbType} from "../../types/db-types/user-db-type"
import {CommentDbType} from "../../types/db-types/comment-db-type"
import {DeviceDBType} from "../../types/db-types/device-db-type";
import {ReqCountDbType} from "../../types/application-db-types/req-db-type";
import {RefreshTokenBlacklistDbType} from "../../types/application-db-types/tokens-type";
import mongoose from "mongoose";
import {blogSchema} from "./schemas/blog-schema";
import {postSchema} from "./schemas/post-schema";
import {userSchema} from "./schemas/user-schema";
import {commentSchema} from "./schemas/comment-schema";
import {deviceSchema} from "./schemas/device-schema";
import {refreshTokenBlacklistSchema} from "./schemas/refresh-token-blacklist-schema";
import {reqCountSchema} from "./schemas/req-count-schema";

// const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
// export const db: Db = client.db(SETTINGS.DB_NAME)

// export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.DB_COLLECTION_NAME.BLOG)
// export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.DB_COLLECTION_NAME.POST)
// export const userCollection: Collection<UserDbType> = db.collection<UserDbType>(SETTINGS.DB_COLLECTION_NAME.USER)
// export const commentCollection: Collection<CommentDbType> = db.collection<CommentDbType>(SETTINGS.DB_COLLECTION_NAME.COMMENT)
// export const deviceCollection: Collection<DeviceDBType> = db.collection<DeviceDBType>(SETTINGS.DB_COLLECTION_NAME.DEVICE)
// export const refreshTokenBlacklistCollection: Collection<RefreshTokenBlacklistDbType> = db.collection<RefreshTokenBlacklistDbType>(SETTINGS.DB_COLLECTION_NAME.REFRESH_TOKEN_BLACKLIST)
// export const reqCountCollection: Collection<ReqDbType> = db.collection<ReqDbType>(SETTINGS.DB_COLLECTION_NAME.REQ_COUNTER)

export const BlogModel = mongoose.model<BlogDBType>(SETTINGS.DB_COLLECTION_NAME.BLOG, blogSchema)
export const PostModel = mongoose.model<PostDBType>(SETTINGS.DB_COLLECTION_NAME.POST, postSchema)
export const UserModel = mongoose.model<UserDbType>(SETTINGS.DB_COLLECTION_NAME.USER, userSchema)
export const CommentModel = mongoose.model<CommentDbType>(SETTINGS.DB_COLLECTION_NAME.COMMENT, commentSchema)
export const DeviceModel = mongoose.model<DeviceDBType>(SETTINGS.DB_COLLECTION_NAME.DEVICE, deviceSchema)
export const RefreshTokenBlacklistModel = mongoose.model<RefreshTokenBlacklistDbType>(SETTINGS.DB_COLLECTION_NAME.REFRESH_TOKEN_BLACKLIST, refreshTokenBlacklistSchema)
export const ReqCountModel = mongoose.model<ReqCountDbType>(SETTINGS.DB_COLLECTION_NAME.REQ_COUNT, reqCountSchema)

export const connectToDB = async () => {
    try {
        await mongoose.connect(SETTINGS.MONGO_URL, {dbName: SETTINGS.DB_NAME})
        // await client.connect()
        console.log('Connection to db - Success')
        return true
    } catch (e) {
        console.log(e)
        await mongoose.disconnect()
        // await client.close()
        return false
    }
}