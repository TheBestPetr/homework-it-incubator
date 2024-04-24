import {ObjectId} from "mongodb";

export type PostDBType = {
    id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: ObjectId
    blogName: string
    //createdAt: string
}