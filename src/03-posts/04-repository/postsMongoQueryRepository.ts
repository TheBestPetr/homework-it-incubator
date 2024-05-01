import {postCollection} from "../../db/mongo-db";
import {InputPostQueryType, OutputPostQueryType, OutputPostType} from "../../04-types/postType";
import {ObjectId} from "mongodb";

export const postsMongoQueryRepository = {
    async find(query: InputPostQueryType): Promise<OutputPostQueryType> {
        const items = await postCollection
            .find()
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray()
        const totalCount = await postCollection.countDocuments()
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
    },

    async findPostsByBlogId(query: InputPostQueryType, blogId: string): Promise<OutputPostQueryType> {
        const items = await postCollection
            .find({blogId: blogId})
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray()
        const totalCount = await postCollection.countDocuments()
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
    },

    async findById(id: string): Promise<OutputPostType | null> {
        const ObjId = new ObjectId(id)
        const post = await postCollection.findOne({_id: ObjId})
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
    }
}