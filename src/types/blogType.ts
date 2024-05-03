import {SortDirection} from "mongodb";

export type OutputBlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type InputBlogType = {
    name: string
    description: string
    websiteUrl: string
}

export type OutputBlogQueryType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<OutputBlogType>
}

export type InputBlogQueryType = {
    searchNameTerm: string | null
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
}