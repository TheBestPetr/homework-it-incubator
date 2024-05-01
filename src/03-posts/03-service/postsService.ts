import {postsMongoRepository} from "../04-repository/postsMongoRepository";
import {InputBlogPostType, InputPostType, OutputPostType} from "../../04-types/postType";
import {ObjectId} from "mongodb";
import {PostDBType} from "../../db/post-db-type";
import {blogsMongoQueryRepository} from "../../02-blogs/04-repository/blogsMongoQueryRepository";

export const postsService = {
    async create(input: InputPostType): Promise<OutputPostType> {
        const blog = await blogsMongoQueryRepository.findById(input.blogId)
        const createdPost: PostDBType = {
            ...input,
            blogId: new ObjectId(input.blogId).toString(),
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        const insertedPost = await postsMongoRepository.create(createdPost)
        return {
            id: insertedPost.insertedId.toString(),
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt
        }
    },

    async createPostForBlogIdParams(blogId: string, input: InputBlogPostType): Promise<OutputPostType> {
        const blog = await blogsMongoQueryRepository.findById(blogId)
        const createdPost: PostDBType = {
            ...input,
            blogId: new ObjectId(blogId).toString(),
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        const insertedPost = await postsMongoRepository.create(createdPost)
        return {
            id: insertedPost.insertedId.toString(),
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt
        }
    },

    async update(id: string, input: InputPostType): Promise<boolean> {
        const ObjId = new ObjectId(id)
        const result = await postsMongoRepository.update(ObjId, input)
        return !!result.matchedCount
    },

    async delete(id: string): Promise<boolean> {
        const ObjId = new ObjectId(id)
        const result = await postsMongoRepository.delete(ObjId)
        return result.deletedCount === 1
    }
}