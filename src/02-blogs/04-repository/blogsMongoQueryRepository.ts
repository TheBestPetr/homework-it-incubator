import {blogCollection} from "../../db/mongo-db";
import {InputBlogQueryType, OutputBlogQueryType, OutputBlogType} from "../../04-types/blogType";
import {ObjectId} from "mongodb";

export const blogsMongoQueryRepository = {
    async find(query: InputBlogQueryType): Promise<OutputBlogQueryType> {
        const items = await blogCollection
            .find()
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray()
        const totalCount = await blogCollection.countDocuments()
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
    },

    async findById(id: string): Promise<OutputBlogType | null>{
        const ObjId = new ObjectId(id)
        const blog = await blogCollection.findOne({_id: ObjId})
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
}