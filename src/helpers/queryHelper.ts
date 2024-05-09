import {SortDirection} from "mongodb";
import {InputBlogQueryType} from "../types/blogType";
import {InputPostQueryType} from "../types/postType";
import {query} from "express-validator";
import {InputUserQueryType, InputUserType} from "../types/userType";
import {InputCommentQueryType, InputCommentType} from "../types/commentType";

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

export const sortNPagingUserQuery = (query: Partial<InputUserQueryType>): InputUserQueryType => {
    return {
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null
    }
}

export const sortNPagingCommentQuery = (query: Partial<InputCommentQueryType>): InputCommentQueryType => {
    return {
        pageNumber: query.pageNumber ? query.pageNumber : 1,
        pageSize: query.pageSize ? query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc'
    }
}