import {LikeStatus} from "../input-output-types/comment-type";

export type CommentDbLikesInfo = {
    commentId: string
    userId: string
    status: LikeStatus
    createdAt: string
}