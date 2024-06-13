import {SortDirection} from "mongodb";
import {CommentatorType, LikesType} from "../db-types/comment-db-type";

export type InputCommentType = {
    content: string
}

export type InputLikeType = {

}

export type OutputCommentType = {
    id: string
    content: string
    commentatorInfo: CommentatorType
    createdAt: string
    //likesInfo: LikesType
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