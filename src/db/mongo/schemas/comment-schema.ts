import mongoose from "mongoose";
import {CommentatorType, CommentDbType, LikesType} from "../../../types/db-types/comment-db-type";

export const commentatorSchema = new mongoose.Schema<CommentatorType>({
    userId: {type: String, required: true},
    userLogin: {type: String, required: true}
}, {_id: false})

export const likesSchema = new mongoose.Schema<LikesType>({
    likesCount: {type: Number, required: true},
    dislikesCount: {type: Number, required: true},
}, {_id: false})

export const commentSchema = new mongoose.Schema<CommentDbType>({
    postId: {type: String, required: true},
    content: {type: String, required: true},
    commentatorInfo: {type: commentatorSchema, required: true},
    createdAt: {type: String, required: true},
    likesInfo: {type: likesSchema, required: true}
})