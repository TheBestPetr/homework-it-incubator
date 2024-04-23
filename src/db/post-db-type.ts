import {ObjectId} from "mongodb";

export type PostDBType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: ObjectId
    blogName: string
   // createdAt: string
}