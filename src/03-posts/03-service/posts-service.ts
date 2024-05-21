import {postsMongoRepository} from "../04-repository/posts-mongo-repository";
import {InputBlogPostType, InputPostType, OutputPostType} from "../../types/input-output-types/post-type";
import {ObjectId} from "mongodb";
import {PostDBType} from "../../types/db-types/post-db-type";
import {blogsMongoQueryRepository} from "../../02-blogs/04-repository/blogs-mongo-query-repository";

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
        const result = await postsMongoRepository.update(id, input)
        return !!result.matchedCount
    },

    async delete(id: string): Promise<boolean> {
        const result = await postsMongoRepository.delete(id)
        return result.deletedCount === 1
    }
}