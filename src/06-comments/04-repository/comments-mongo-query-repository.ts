import {
    InputCommentQueryType,
    OutputCommentQueryType,
    OutputCommentType
} from "../../types/input-output-types/comment-type";
import {CommentModel} from "../../db/mongo/mongo-db";
import {ObjectId} from "mongodb";
import {CommentLikesInfoMongoRepository} from "./comment-likes-info-mongo-repository";
import {JwtService} from "../../application/jwt-service/jwt-service";

export class CommentsMongoQueryRepository {
    async findById(commentId: string, token?: string): Promise<OutputCommentType | null> {
        let status = null
        if (token) {
            const jwtService = new JwtService()
            const commentLikesInfoMongoRepository = new CommentLikesInfoMongoRepository()
            const userId = await jwtService.getUserIdByToken(token.split(' ')[1])
            status = await commentLikesInfoMongoRepository.isStatusExist(commentId, userId)
        }
        const comment = await CommentModel.findOne({_id: new ObjectId(commentId)}).lean()
        if (comment) {
            return {
                id: comment._id.toString(),
                content: comment.content,
                commentatorInfo: {
                    userId: comment.commentatorInfo.userId,
                    userLogin: comment.commentatorInfo.userLogin
                },
                createdAt: comment.createdAt,
                likesInfo: {
                    likesCount: comment.likesInfo.likesCount,
                    dislikesCount: comment.likesInfo.dislikesCount,
                    myStatus: status? status : 'None'
                }
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
                createdAt: comment.createdAt,
                likesInfo: {
                    likesCount: comment.likesInfo.likesCount,
                    dislikesCount: comment.likesInfo.dislikesCount,
                    myStatus: 'None'
                }
            }))
        }
    }
}