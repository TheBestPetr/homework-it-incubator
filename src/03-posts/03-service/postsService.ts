import {postsMongoRepository} from "../04-repository/postsMongoRepository";
import {InputBlogPostType, InputPostType, OutputPostType} from "../../04-input-output-types/postType";
import {ObjectId} from "mongodb";
import {PostDBType} from "../../db/post-db-type";
import {blogsService} from "../../02-blogs/03-service/blogsService";

export const postsService = {
    async find() {
        const posts = await postsMongoRepository.find()
        return posts.map(post => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }))
    },

    async findPostsByBlogId(blogId: string){
        const posts = await postsMongoRepository.findPostsByBlogId(blogId)
        return posts.map(post => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }))
    },

    async findById(id: string): Promise<OutputPostType | null> {
        const objId = new ObjectId(id)
        const post = await postsMongoRepository.findById(objId)
        if (post) {
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }
        } else {
            return null
        }
    },

    async create(input: InputPostType): Promise<OutputPostType> {
        const blog = await blogsService.findById(input.blogId)
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

    async createBlogPost(blogId: string, input: InputBlogPostType): Promise<OutputPostType> {
        const blog = await blogsService.findById(blogId)
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