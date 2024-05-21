import {CommentatorType} from "../input-output-types/comment-type";

export type CommentDbType = {
    postId: string
    content: string
    commentatorInfo: CommentatorType
    createdAt: string
}