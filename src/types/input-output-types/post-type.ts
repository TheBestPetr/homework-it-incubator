import {SortDirection} from "mongodb";
import {LikeStatus} from "./comment-type";

export type LikeDetailsType = {
    addedAt: string
    userId: string
    login: string
}

export type ExtendedLikesInfoType = {
    likesCount: number
    dislikesCount: number
    myStatus: LikeStatus
    newestLikes?: LikeDetailsType[]
}

export type OutputPostType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
    extendedLikesInfo: ExtendedLikesInfoType
}

export type InputPostType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type InputBlogPostType = {
    title: string
    shortDescription: string
    content: string
}

export type OutputPostQueryType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Array<OutputPostType>
}

export type InputPostQueryType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortDirection
}