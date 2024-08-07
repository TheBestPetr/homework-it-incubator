import mongoose from "mongoose";
import {PostDBType} from "../../../types/db-types/post-db-type";
import {likesSchema} from "./comment-schema";

export const postSchema = new mongoose.Schema<PostDBType>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: String, required: true},
    blogName: {type: String, required: true},
    createdAt: {type: String, required: true},
    likesInfo: {type: likesSchema, required: true}
})