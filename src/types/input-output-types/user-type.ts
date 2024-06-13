import {SortDirection} from "mongodb";

export type InputUserType = {
    login: string
    password: string
    email: string
}

export type OutputUserType = {
    id: string
    login: string
    email: string
    createdAt: string
}

export type OutputIType = {
    email: string
    login: string
    userId: string
}

export type InputUserQueryType = {
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
    searchLoginTerm: string | null
    searchEmailTerm: string | null
}

export type OutputUserQueryType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<OutputUserType>
}