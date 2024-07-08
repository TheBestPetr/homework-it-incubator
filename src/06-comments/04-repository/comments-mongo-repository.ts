import {CommentDbType} from "../../types/db-types/comment-db-type";
import {CommentModel} from "../../db/mongo/mongo-db";
import {ObjectId} from "mongodb";
import {InputCommentType, LikeStatus} from "../../types/input-output-types/comment-type";

export class CommentsMongoRepository {
    async create(comment: CommentDbType) {
        return CommentModel.create(comment)
    }

    async update(input: InputCommentType, commentId: string) {
        return CommentModel.updateOne({_id: new ObjectId(commentId)}, {$set: {content: input.content}})
    }

    async delete(commentId: string) {
        return CommentModel.deleteOne({_id: new ObjectId(commentId)})
    }

    async updateAddCommentLikesCount(commentId: string, likeStatus: LikeStatus): Promise<boolean> {
        if (likeStatus === 'Like') {
            await CommentModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.likesCount': 1}})
            return true
        }
        if (likeStatus === 'Dislike') {
            await CommentModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.dislikesCount': 1}})
            return true
        }
        return false
    }

    async updateExistCommentLikesCount(commentId: string, oldStatus: LikeStatus, newStatus: LikeStatus): Promise<boolean> {
        if (oldStatus === 'Like' && newStatus === 'Dislike') {
            await CommentModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.likesCount': -1, 'likesInfo.dislikesCount': 1}})
            return true
        }
        if (oldStatus === 'Like' && newStatus === 'None') {
            await CommentModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.likesCount': -1}})
            return true
        }
        if (oldStatus === 'Dislike' && newStatus === 'Like') {
            await CommentModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.likesCount': 1, 'likesInfo.dislikesCount': -1}})
            return true
        }
        if (oldStatus === 'Dislike' && newStatus === 'None') {
            await CommentModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.dislikesCount': -1}})
            return true
        }
        return oldStatus === newStatus
    }
}