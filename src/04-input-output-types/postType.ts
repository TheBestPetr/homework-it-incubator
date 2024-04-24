import {ObjectId} from "mongodb";

export type PostType = {
    id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: ObjectId
    blogName: string
    //createdAt: string
}

export type InputPostType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}