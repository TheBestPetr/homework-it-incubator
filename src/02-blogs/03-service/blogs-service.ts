import {blogsMongoRepository} from "../04-repository/blogs-mongo-repository";
import {InputBlogType, OutputBlogType} from "../../types/input-output-types/blog-type";
import {BlogClass} from "../../classes/blog-class";

class BlogsService {
    async create(input: InputBlogType): Promise<OutputBlogType> {
        const createdBlog = new BlogClass(
            input.name,
            input.description,
            input.websiteUrl,
            new Date().toISOString(),
            false
        )
        const insertedBlog = await blogsMongoRepository.create(createdBlog)
        return {
            id: insertedBlog.id.toString(),
            name: createdBlog.name,
            description: createdBlog.description,
            websiteUrl: createdBlog.websiteUrl,
            createdAt: createdBlog.createdAt,
            isMembership: createdBlog.isMembership
        }
    }

    async update(id: string, input: InputBlogType): Promise<boolean> {
        const result = await blogsMongoRepository.update(id, input)
        return result.matchedCount === 1
    }

    async delete(id: string): Promise<boolean> {
        const result = await blogsMongoRepository.delete(id)
        return result.deletedCount === 1
    }
}

export const blogsService = new BlogsService()