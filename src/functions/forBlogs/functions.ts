import {BlogDBType} from "../../db/blog-db-type";
import {ObjectId} from "mongodb";

export const mapBlogToOutputBlogQueryType: any = (blog: BlogDBType, _id: ObjectId) => {
    return {
        id: _id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        isMembership: blog.isMembership,
        createdAt: blog.createdAt
    }
}