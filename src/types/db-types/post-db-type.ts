import {LikesType} from "./comment-db-type";

export type PostDBType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
    likesInfo: LikesType
}