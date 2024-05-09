import {SortDirection} from "mongodb";

export type InputCommentType = {
    content: string
}

export type OutputCommentType = {
    id: string
    content: string
    commentatorInfo: CommentatorType
    createdAt: string
}

export type CommentatorType = {
    userId: string
    userLogin: string
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