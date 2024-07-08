import {CommentLikeInfoModel} from "../../db/mongo/mongo-db";
import {CommentDbLikesInfo} from "../../types/db-types/comment-like-info-db-type";
import {LikeStatus} from "../../types/input-output-types/comment-type";

export class CommentLikesInfoMongoRepository {
    async isStatusExist(commentId: string, userId: string): Promise<null | LikeStatus> {
        const result = await CommentLikeInfoModel.findOne({commentId: commentId, userId: userId})
        if (result) {
            return result.status
        }
        return null
    }

    async createNewLikeInfo(commentLikeInfo: CommentDbLikesInfo): Promise<boolean> {
        const result = await CommentLikeInfoModel.create(commentLikeInfo)
        return !!result
    }

    async updateCommentLikeInfo(commentId: string, userId: string, newStatus: LikeStatus): Promise<boolean> {
        const result = await CommentLikeInfoModel.updateOne({commentId: commentId, userId: userId},
            {$set: {status: newStatus}})
        return result.matchedCount === 1
    }
}