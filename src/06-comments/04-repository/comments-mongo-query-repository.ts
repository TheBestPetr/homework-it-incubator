import {
    InputCommentQueryType,
    OutputCommentQueryType,
    OutputCommentType
} from "../../types/input-output-types/comment-type";
import {CommentModel} from "../../db/mongo/mongo-db";
import {ObjectId} from "mongodb";

export class CommentsMongoQueryRepository {
    async findById(id: string): Promise<OutputCommentType | null> {
        const comment = await CommentModel.findOne({_id: new ObjectId(id)}).lean()
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
    }

    async findCommentsByPostId(postId: string, query: InputCommentQueryType): Promise<OutputCommentQueryType> {
        const items = await CommentModel
            .find({postId: postId})
            .sort({[`${query.sortBy}`]: query.sortDirection})
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .lean()
        const totalCount = await CommentModel.countDocuments({postId: postId})
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