import {CommentatorType} from "../types/commentType";

export type CommentDbType = {
    postId: string
    content: string
    commentatorInfo: CommentatorType
    createdAt: string
}