import {InputCommentType, OutputCommentType} from "../../types/commentType";
import {usersMongoQueryRepository} from "../../04-users/04-repository/usersMongoQueryRepository";
import {CommentDbType} from "../../db/comment-db-type";
import {commentsMongoRepository} from "../04-repository/commentsMongoRepository";
import {commentsMongoQueryRepository} from "../04-repository/commentsMongoQueryRepository";

export const commentsService = {
    async create(content: InputCommentType, commentatorId: string, postId: string): Promise<OutputCommentType> {
        const user = await usersMongoQueryRepository.findWithId(commentatorId)
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
            id: insertedComment.insertedId.toString(),
            content: content.content,
            commentatorInfo: {
                userId: user!.userId,
                userLogin: user!.login
            },
            createdAt: new Date().toISOString()
        }
    },

    async update(input: InputCommentType, commentId: string): Promise<boolean> {
        const result = await commentsMongoRepository.update(input, commentId)
        return !result.matchedCount
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