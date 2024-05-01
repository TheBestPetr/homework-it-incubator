import {InputBlogType, OutputBlogType} from "../../04-types/blogType";
import {blogCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../../db/blog-db-type";

export const blogsMongoRepository = {
    // async findById(id: string): Promise<OutputBlogType | null>{
    //     const ObjId = new ObjectId(id)
    //     const blog = await blogCollection.findOne({_id: ObjId})
    //     if (blog) {
    //         return {
    //             id: blog._id.toString(),
    //             name: blog.name,
    //             description: blog.description,
    //             websiteUrl: blog.websiteUrl,
    //             isMembership: blog.isMembership,
    //             createdAt:blog.createdAt
    //         }
    //     } else {
    //         return null
    //     }
    // },

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