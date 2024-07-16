import {LikeStatus} from "../../types/input-output-types/comment-type";
import {PostLikeInfoModel} from "../../db/mongo/mongo-db";
import {PostDbLikesInfo} from "../../types/db-types/post-like-info-db-type";

export class PostLikesInfoMongoRepository {
    async findLikesInfo(postId: string, userId: string): Promise<null | PostDbLikesInfo> {
        const result = await PostLikeInfoModel.findOne({postId: postId, userId: userId})
        if (result) {
            return result
        }
        return null
    }

    async createNewLikeInfo(postLikeInfo: PostDbLikesInfo): Promise<boolean> {
        const result = await PostLikeInfoModel.create(postLikeInfo)
        return !!result
    }

    async updatePostLikeInfo(postId: string, userId: string, newStatus: LikeStatus): Promise<boolean> {
        const result = await PostLikeInfoModel.updateOne({postId: postId, userId: userId},
            {$set: {status: newStatus}})
        return result.matchedCount === 1
    }

    async findNewestLikes(postId: string): Promise<PostDbLikesInfo[] | null> {
        const newestLikes = await PostLikeInfoModel
            .find({postId: postId})
            .sort({createdAt: -1})
            .limit(3)
            .lean()
        return newestLikes.length > 0 ? newestLikes : null
    }
}