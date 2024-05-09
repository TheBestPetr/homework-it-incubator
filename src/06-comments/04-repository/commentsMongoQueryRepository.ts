import {InputCommentQueryType, OutputCommentQueryType, OutputCommentType} from "../../types/commentType";
import {commentCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {postsMongoQueryRepository} from "../../03-posts/04-repository/postsMongoQueryRepository";

export const commentsMongoQueryRepository = {
    async findById(id: string): Promise<OutputCommentType | null> {
        const comment = await commentCollection.findOne({_id: new ObjectId(id)})
        if (comment) {
            return {
                id: comment._id.toString(),
                content: comment.content,
                commentatorInfo: {
                    userId: comment.commentatorInfo.userId,
                    userLogin: comment.commentatorInfo.userLogin
                },
                createdAt: comment.createdAt
            }
        }
        return null
    },

    async findCommentsByPostId(postId: string, query: InputCommentQueryType): Promise<OutputCommentQueryType> {
        const items = await commentCollection
            .find({postId: postId})
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray()
        const totalCount = await commentCollection.countDocuments({postId: postId})
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: items.map(comment => ({
                id: comment._id.toString(),
                content: comment.content,
                commentatorInfo: {
                    userId: comment.commentatorInfo.userId,
                    userLogin: comment.commentatorInfo.userLogin
                },
                createdAt: comment.createdAt
            }))
        }
    }
}