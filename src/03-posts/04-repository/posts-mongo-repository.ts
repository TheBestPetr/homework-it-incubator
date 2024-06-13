import {InputPostType} from "../../types/input-output-types/post-type";
import {PostModel} from "../../db/mongo/mongo-db";
import {ObjectId} from "mongodb";
import {PostDBType} from "../../types/db-types/post-db-type";

export const postsMongoRepository = {
    async create(input: PostDBType) {
        return PostModel.create(input)
    },

    async update(id: string, input: InputPostType) {
        return PostModel.updateOne({_id: new ObjectId(id)}, {
            $set: {
                ...input,
                blogId: new ObjectId(input.blogId).toString()
            }
        })
    },

    async delete(id: string) {
        return PostModel.deleteOne({_id: new ObjectId(id)})
    }
}