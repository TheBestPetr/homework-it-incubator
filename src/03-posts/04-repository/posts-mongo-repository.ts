import {InputPostType} from "../../types/input-output-types/post-type";
import {CommentModel, PostModel} from "../../db/mongo/mongo-db";
import {ObjectId} from "mongodb";
import {PostDBType} from "../../types/db-types/post-db-type";
import {LikeStatus} from "../../types/input-output-types/comment-type";

export class PostsMongoRepository {
    async create(input: PostDBType) {
        return PostModel.create(input)
    }

    async update(id: string, input: InputPostType) {
        return PostModel.updateOne({_id: new ObjectId(id)}, {
            $set: {
                ...input,
                blogId: new ObjectId(input.blogId).toString()
            }
        })
    }

    async delete(id: string) {
        return PostModel.deleteOne({_id: new ObjectId(id)})
    }

    async updateAddPostLikesCount(commentId: string, likeStatus: LikeStatus): Promise<boolean> {
        if (likeStatus === 'Like') {
            await PostModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.likesCount': 1}})
            return true
        }
        if (likeStatus === 'Dislike') {
            await PostModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.dislikesCount': 1}})
            return true
        }
        return false
    }

    async updateExistPostLikesCount(commentId: string, oldStatus: LikeStatus, newStatus: LikeStatus): Promise<boolean> {
        if (oldStatus === 'Like' && newStatus === 'Dislike') {
            await PostModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.likesCount': -1, 'likesInfo.dislikesCount': 1}})
            return true
        }
        if (oldStatus === 'Like' && newStatus === 'None') {
            await PostModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.likesCount': -1}})
            return true
        }
        if (oldStatus === 'Dislike' && newStatus === 'Like') {
            await PostModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.likesCount': 1, 'likesInfo.dislikesCount': -1}})
            return true
        }
        if (oldStatus === 'Dislike' && newStatus === 'None') {
            await PostModel.updateOne({_id: new ObjectId(commentId)}, {$inc: {'likesInfo.dislikesCount': -1}})
            return true
        }
        return oldStatus === newStatus
    }
}