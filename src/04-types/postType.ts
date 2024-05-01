import {SortDirection} from "mongodb";

export type OutputPostType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
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