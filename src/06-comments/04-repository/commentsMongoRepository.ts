import {CommentDbType} from "../../db/comment-db-type";
import {commentCollection, postCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {InputCommentType} from "../../types/commentType";

export const commentsMongoRepository = {
    async create(comment: CommentDbType) {
        return await commentCollection.insertOne(comment)
    },

    async update(input: InputCommentType, id: string) {
        return await commentCollection.updateOne({_id: new ObjectId(id)}, {$set: {...input}})
    },

    async delete(id: string) {
        return await commentCollection.deleteOne({_id: new ObjectId(id)})
    }
}