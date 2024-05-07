import {InputBlogType} from "../../types/blogType";
import {blogCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../../db/blog-db-type";

export const blogsMongoRepository = {
    async create(input: BlogDBType) {
        return await blogCollection.insertOne({...input})
    },

    async update(id: string, input: InputBlogType) {
        return await blogCollection.updateOne({_id: new ObjectId(id)}, {$set: {...input,}})
    },

    async delete(id: string) {
        return await blogCollection.deleteOne({_id: new ObjectId(id)})
    }
}