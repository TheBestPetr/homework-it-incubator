import mongoose from "mongoose";
import {CommentDbLikesInfo} from "../../../types/db-types/comment-like-info-db-type";

export const commentLikesInfoSchema = new mongoose.Schema<CommentDbLikesInfo>({
    commentId: {type: String, required: true},
    userId: {type: String, required: true},
    status: {type: String, enum: ['None', 'Like', 'Dislike'], required: true},
    createdAt: {type: String, required: true}
})