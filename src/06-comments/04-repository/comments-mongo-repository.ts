import {CommentDbType} from "../../types/db-types/comment-db-type";
import {commentCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {InputCommentType} from "../../types/input-output-types/comment-type";

export const commentsMongoRepository = {
    async create(comment: CommentDbType) {
        return await commentCollection.insertOne(comment)
    },

    async update(input: InputCommentType, commentId: string) {
        return await commentCollection.updateOne({_id: new ObjectId(commentId)}, {$set: {content: input.content}})
    },

    async delete(id: string) {
        return await commentCollection.deleteOne({_id: new ObjectId(id)})
    }
}