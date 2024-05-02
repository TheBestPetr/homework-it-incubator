import {SortDirection} from "mongodb";
import {InputBlogQueryType} from "../04-types/blogType";
import {InputPostQueryType} from "../04-types/postType";

export const sortNPagingBlogQuery = (query: InputBlogQueryType) => {
    return {
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection: 'desc',
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    }
}

export const sortNPagingPostQuery = (query: InputPostQueryType) => {
    return {
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection: 'desc',
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    }
}