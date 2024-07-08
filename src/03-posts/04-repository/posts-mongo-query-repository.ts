import {PostModel} from "../../db/mongo/mongo-db";
import {InputPostQueryType, OutputPostQueryType, OutputPostType} from "../../types/input-output-types/post-type";
import {ObjectId} from "mongodb";

export class PostsMongoQueryRepository {
    async find(query: InputPostQueryType): Promise<OutputPostQueryType> {
        const items = await PostModel
            .find()
            .sort({[`${query.sortBy}`]: query.sortDirection})
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .lean()
        const totalCount = await PostModel.countDocuments()
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: items.map(post => ({
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }))
        }
    }

    async findPostsByBlogId(query: InputPostQueryType, blogId: string): Promise<OutputPostQueryType> {
        const items = await PostModel
            .find({blogId: blogId})
            .sort({[`${query.sortBy}`]: query.sortDirection})
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .lean()
        const totalCount = await PostModel.countDocuments({blogId: blogId})
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: items.map(post => ({
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }))
        }
    }

    async findById(id: string): Promise<OutputPostType | null> {
        const post = await PostModel.findOne({_id: new ObjectId(id)}).lean()
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
        }
        return null
    }
}