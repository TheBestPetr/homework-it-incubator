import {BlogModel} from "../../db/mongo/mongo-db";
import {InputBlogQueryType, OutputBlogQueryType, OutputBlogType} from "../../types/input-output-types/blog-type";
import {ObjectId} from "mongodb";

export class BlogsMongoQueryRepository {
    async find(query: InputBlogQueryType): Promise<OutputBlogQueryType> {
        const search = query.searchNameTerm
            ? {name: {$regex: query.searchNameTerm, $options: 'i'}}
            : {}
        const items = await BlogModel
            .find(search)
            .sort({[`${query.sortBy}`]: query.sortDirection})
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .lean()
        const totalCount = await BlogModel.countDocuments(search)
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: items.map(blog => ({
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                isMembership: blog.isMembership,
                createdAt: blog.createdAt
            }))
        }
    }

    async findById(id: string): Promise<OutputBlogType | null> {
        const blog = await BlogModel.findOne({_id: new ObjectId(id)}).lean()
        if (blog) {
            return {
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                isMembership: blog.isMembership,
                createdAt: blog.createdAt
            }
        } else {
            return null
        }
    }
}