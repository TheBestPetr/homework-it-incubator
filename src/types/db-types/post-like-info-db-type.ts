import {LikeStatus} from "../input-output-types/comment-type";

export type PostDbLikesInfo = {
    postId: string
    userId: string
    userLogin: string
    status: LikeStatus
    createdAt: string
}