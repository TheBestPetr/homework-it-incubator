import {InputCommentType, OutputCommentType} from "../../types/input-output-types/comment-type";
import {usersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";
import {CommentDbType} from "../../types/db-types/comment-db-type";
import {commentsMongoRepository} from "../04-repository/comments-mongo-repository";
import {commentsMongoQueryRepository} from "../04-repository/comments-mongo-query-repository";

export const commentsService = {
    async create(content: InputCommentType, commentatorId: string, postId: string): Promise<OutputCommentType> {
        const user = await usersMongoQueryRepository.findById(commentatorId)
        const newComment: CommentDbType = {
            postId: postId,
            content: content.content,
            commentatorInfo: {
                userId: user!.userId,
                userLogin: user!.login
            },
            createdAt: new Date().toISOString()
        }
        const insertedComment = await commentsMongoRepository.create(newComment)
        return {
            id: insertedComment.id.toString(),
            content: content.content,
            commentatorInfo: {
                userId: user!.userId,
                userLogin: user!.login
            },
            createdAt: newComment.createdAt
        }
    },

    async update(input: InputCommentType, commentId: string): Promise<boolean> {
        const result = await commentsMongoRepository.update(input, commentId)
        return result.matchedCount === 1
    },

    async isUserCanDoThis(userId: string, commentId: string): Promise<boolean> {
        const comment = await commentsMongoQueryRepository.findById(commentId)
        return userId === comment?.commentatorInfo.userId;

    },

    async delete(id: string) {
        const result = await commentsMongoRepository.delete(id)
        return result.deletedCount === 1
    }
}