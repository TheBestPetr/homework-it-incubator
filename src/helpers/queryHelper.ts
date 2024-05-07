import {SortDirection} from "mongodb";
import {InputBlogQueryType} from "../types/blogType";
import {InputPostQueryType} from "../types/postType";
import {InputUserQueryType} from "../types/userType";

export const sortNPagingBlogQuery = (query: InputBlogQueryType) => {
    return {
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    }
}

export const sortNPagingPostQuery = (query: InputPostQueryType) => {
    return {
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    }
}

export const sortNPagingUserQuery = (query: {
    sortBy?: string,
    sortDirection?: string,
    pageNumber?: string,
    pageSize?: string,
    searchLoginTerm?: string,
    searchEmailTerm?: string
}): InputUserQueryType => {
    return {
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null
    }
}