import {blogsMongoRepository} from "../04-repository/blogsMongoRepository";
import {InputBlogType, OutputBlogType} from "../../04-types/blogType";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../../db/blog-db-type";

export const blogsService = {
    async create(input: InputBlogType): Promise<OutputBlogType> {
        const createdBlog: BlogDBType = {
            ...input,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const insertedBlog = await blogsMongoRepository.create(createdBlog)
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
        const result = await blogsMongoRepository.update(objId, input)
        return !!result.matchedCount
    },

    async delete(id: string): Promise<boolean> {
        const ObjId = new ObjectId(id)
        const result = await blogsMongoRepository.delete(ObjId)
        return result.deletedCount === 1
    }
}