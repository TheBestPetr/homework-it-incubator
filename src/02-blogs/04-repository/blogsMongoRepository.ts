import {InputBlogType} from "../../04-types/blogType";
import {blogCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../../db/blog-db-type";

export const blogsMongoRepository = {
    async create(input: BlogDBType){
        return await blogCollection.insertOne({...input})
    },

    async update(id: ObjectId, input: InputBlogType){
        return await blogCollection.updateOne({_id: id}, {$set: {...input,}})
    },

    async delete(id: ObjectId){
        return await blogCollection.deleteOne({_id: id})
    }
}