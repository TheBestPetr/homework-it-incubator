import {ObjectId} from "mongodb";

export type BlogDBType = {
    id: string
    name: string
    description: string
    websiteUrl: string
   // createdAt: string
   // isMembership: boolean // false until hw31
}