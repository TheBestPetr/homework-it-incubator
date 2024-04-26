import {OutputBlogType, InputBlogType} from "../../04-input-output-types/blogType";
import {blogCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../../db/blog-db-type";

export const BlogsMongoDBRepository = {
    async find() {
        const blogs = await blogCollection.find().toArray();
        return blogs.map(blog => ({
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: blog.isMembership,
            createdAt:blog.createdAt
        }))
    },

    async findById(id: string): Promise<OutputBlogType | null> {
        const objId = new ObjectId(id)
        const blog = await blogCollection.findOne({_id: objId})
        if (blog) {
            return {
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                isMembership: blog.isMembership,
                createdAt:blog.createdAt
            }
        } else {
            return null
        }
    },

    async create(input: InputBlogType): Promise<OutputBlogType> {
        const createdBlog: BlogDBType = {
            ...input,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const insertedBlog = await blogCollection.insertOne(createdBlog)
        return {
            id: insertedBlog.insertedId.toString(),
            name: createdBlog.name,
            description: createdBlog.description,
            websiteUrl: createdBlog.websiteUrl,
            createdAt:createdBlog.createdAt,
            isMembership: createdBlog.isMembership

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