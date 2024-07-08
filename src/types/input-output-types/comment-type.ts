import {SortDirection} from "mongodb";
import {CommentatorType} from "../db-types/comment-db-type";

export type InputCommentType = {
    content: string
}

export type LikeStatus = 'None' | 'Like' | 'Dislike'

export type InputLikeType = {
    likeStatus: LikeStatus
}

export type LikesInfoType = {
    likesCount: number
    dislikesCount: number
    myStatus: LikeStatus
}

export type OutputCommentType = {
    id: string
    content: string
    commentatorInfo: CommentatorType
    createdAt: string
    likesInfo: LikesInfoType
}

export type InputCommentQueryType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortDirection
}

export type OutputCommentQueryType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<OutputCommentType>
}