import {
    InputCommentType,
    LikeStatus,
    OutputCommentType
} from "../../types/input-output-types/comment-type";
import {UsersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";
import {CommentsMongoRepository} from "../04-repository/comments-mongo-repository";
import {CommentsMongoQueryRepository} from "../04-repository/comments-mongo-query-repository";
import {CommentClass} from "../../classes/comment-class";
import {CommentLikesInfoMongoRepository} from "../04-repository/comment-likes-info-mongo-repository";
import {CommentLikeInfoClass} from "../../classes/comment-like-info-class";

export class CommentsService {
    constructor(
        protected commentsMongoRepository: CommentsMongoRepository,
        protected commentsMongoQueryRepository: CommentsMongoQueryRepository,
        protected usersMongoQueryRepository: UsersMongoQueryRepository,
        protected commentLikeInfoMongoRepository: CommentLikesInfoMongoRepository
    ) {}

    async create(content: InputCommentType, commentatorId: string, postId: string): Promise<OutputCommentType> {
        const user = await this.usersMongoQueryRepository.findById(commentatorId)
        const newComment = new CommentClass(
            postId,
            content.content,
            {userId: user!.userId, userLogin: user!.login},
            new Date().toISOString(),
            {likesCount: 0, dislikesCount: 0}
        )
        const insertedComment = await this.commentsMongoRepository.create(newComment)
        return {
            id: insertedComment.id.toString(),
            content: content.content,
            commentatorInfo: {
                userId: user!.userId,
                userLogin: user!.login
            },
            createdAt: newComment.createdAt,
            likesInfo: {
                likesCount: insertedComment.likesInfo.likesCount,
                dislikesCount: insertedComment.likesInfo.dislikesCount,
                myStatus: 'None'
            }
        }
    }

    async update(input: InputCommentType, commentId: string): Promise<boolean> {
        const result = await this.commentsMongoRepository.update(input, commentId)
        return result.matchedCount === 1
    }

    async isUserCanDoThis(userId: string, commentId: string): Promise<boolean> {
        const comment = await this.commentsMongoQueryRepository.findById(commentId)
        return userId === comment?.commentatorInfo.userId;

    }

    async delete(id: string): Promise<boolean> {
        const result = await this.commentsMongoRepository.delete(id)
        return result.deletedCount === 1
    }

    async updateLikeStatus(commentId: string, userId: string, inputLikeStatus: LikeStatus): Promise<boolean> {
        const oldLikeStatus = await this.commentLikeInfoMongoRepository.isStatusExist(commentId, userId)
        if (!oldLikeStatus) {
            const newCommentLikeInfo = new CommentLikeInfoClass(
                commentId,
                userId,
                inputLikeStatus,
                new Date().toISOString()
            )
            const createLikeInfo = await this.commentLikeInfoMongoRepository.createNewLikeInfo(newCommentLikeInfo)
            const updateLikesCount = await this.commentsMongoRepository.updateAddCommentLikesCount(commentId, inputLikeStatus)
            return createLikeInfo && updateLikesCount
        }
        const updateLikeInfo = await this.commentLikeInfoMongoRepository.updateCommentLikeInfo(commentId, userId, inputLikeStatus)
        const updateLikesCount = await this.commentsMongoRepository.updateExistCommentLikesCount(commentId, oldLikeStatus, inputLikeStatus)
        return updateLikeInfo && updateLikesCount
    }
}