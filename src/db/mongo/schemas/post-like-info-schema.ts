import mongoose from "mongoose";
import {PostDbLikesInfo} from "../../../types/db-types/post-like-info-db-type";

export const postLikesInfoSchema = new mongoose.Schema<PostDbLikesInfo>({
    postId: {type: String, required: true},
    userId: {type: String, required: true},
    userLogin: {type: String, required: true},
    status: {type: String, enum: ['None', 'Like', 'Dislike'], required: true},
    createdAt: {type: String, default: new Date().toISOString,required: true},
})