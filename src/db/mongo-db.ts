import {SETTINGS} from "../settings";
import {Collection, Db, MongoClient} from "mongodb";
import {BlogDBType} from "./blog-db-type";
import {PostDBType} from "./post-db-type";

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const db: Db = client.db(SETTINGS.DB_NAME);

export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.DB_COLLECTION_NAME.BLOG)
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.DB_COLLECTION_NAME.POST)

export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}