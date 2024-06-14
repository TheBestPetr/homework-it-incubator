import {BlogsMongoRepository} from "../04-repository/blogs-mongo-repository";
import {InputBlogType, OutputBlogType} from "../../types/input-output-types/blog-type";
import {BlogClass} from "../../classes/blog-class";

export class BlogsService {
    private blogsMongoRepository: BlogsMongoRepository

    constructor() {
        this.blogsMongoRepository = new BlogsMongoRepository()
    }

    async create(input: InputBlogType): Promise<OutputBlogType> {
        const createdBlog = new BlogClass(
            input.name,
            input.description,
            input.websiteUrl,
            new Date().toISOString(),
            false
        )
        const insertedBlog = await this.blogsMongoRepository.create(createdBlog)
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
        const result = await this.blogsMongoRepository.update(id, input)
        return result.matchedCount === 1
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.blogsMongoRepository.delete(id)
        return result.deletedCount === 1
    }
}