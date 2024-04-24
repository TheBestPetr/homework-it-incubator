import {BlogType, InputBlogType} from "../../04-input-output-types/blogType";
import {blogCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../../db/blog-db-type";

export const BlogsMongoDBRepository = {
    async find() {
        return await blogCollection.find().toArray()
    },

    async findById(id: string): Promise<BlogType | null> {
        const objId = new ObjectId(id)
        const blog = await blogCollection.findOne({_id: objId})
        if (blog) {
            const {_id, ...result} = blog
            return {...result, id: _id}
        } else {
            return null
        }
    },

    async create(input: InputBlogType): Promise<BlogType> {
        const createdBlog: BlogDBType = {
            id: new ObjectId(),
            ...input,
            //createdAt: new Date().toISOString(),
            //isMembership: false
        }
        const insertedBlog = await blogCollection.insertOne(createdBlog)
        return {
                id: insertedBlog.insertedId,
                name: createdBlog.name,
                description: createdBlog.description,
                websiteUrl: createdBlog.websiteUrl
            }
    },

    async update(id: string, input: InputBlogType): Promise<boolean> {
        const objId = new ObjectId(id)
        const result = await blogCollection.updateOne({_id: objId}, {$set: {...input,}})
        return !!result.matchedCount
    },

    async delete(id: string): Promise<boolean> {
        const ObjId = new ObjectId(id)
        const result = await blogCollection.deleteOne({_id: ObjId})
        return result.deletedCount === 1
    }
}