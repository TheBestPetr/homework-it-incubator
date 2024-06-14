import {CommentDbType} from "../../types/db-types/comment-db-type";
import {CommentModel} from "../../db/mongo/mongo-db";
import {ObjectId} from "mongodb";
import {InputCommentType} from "../../types/input-output-types/comment-type";

export class CommentsMongoRepository {
    async create(comment: CommentDbType) {
        return CommentModel.create(comment)
    }

    async update(input: InputCommentType, commentId: string) {
        return CommentModel.updateOne({_id: new ObjectId(commentId)}, {$set: {content: input.content}})
    }

    async delete(id: string) {
        return CommentModel.deleteOne({_id: new ObjectId(id)})
    }
}