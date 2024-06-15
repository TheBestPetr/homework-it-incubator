import {PostsMongoRepository} from "../04-repository/posts-mongo-repository";
import {InputBlogPostType, InputPostType, OutputPostType} from "../../types/input-output-types/post-type";
import {ObjectId} from "mongodb";
import {BlogsMongoQueryRepository,} from "../../02-blogs/04-repository/blogs-mongo-query-repository";
import {PostClass} from "../../classes/post-class";

export class PostsService {
    constructor(
        protected postsMongoRepository: PostsMongoRepository,
        protected blogsMongoQueryRepository: BlogsMongoQueryRepository
    ) {}

    async create(input: InputPostType): Promise<OutputPostType> {
        const blog = await this.blogsMongoQueryRepository.findById(input.blogId)
        const createdPost = new PostClass(
            input.title,
            input.shortDescription,
            input.content,
            new ObjectId(input.blogId).toString(),
            blog!.name,
            new Date().toISOString()
        )
        const insertedPost = await this.postsMongoRepository.create(createdPost)
        return {
            id: insertedPost.id.toString(),
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt
        }
    }

    async createPostForBlogIdParams(blogId: string, input: InputBlogPostType): Promise<OutputPostType> {
        const blog = await this.blogsMongoQueryRepository.findById(blogId)
        const createdPost = new PostClass(
            input.title,
            input.shortDescription,
            input.content,
            new ObjectId(blogId).toString(),
            blog!.name,
            new Date().toISOString()
        )
        const insertedPost = await this.postsMongoRepository.create(createdPost)
        return {
            id: insertedPost.id.toString(),
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt
        }
    }

    async update(id: string, input: InputPostType): Promise<boolean> {
        const result = await this.postsMongoRepository.update(id, input)
        return result.matchedCount === 1
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.postsMongoRepository.delete(id)
        return result.deletedCount === 1
    }
}