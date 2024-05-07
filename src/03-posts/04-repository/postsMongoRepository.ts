import {InputPostType} from "../../types/postType";
import {postCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {PostDBType} from "../../db/post-db-type";

export const postsMongoRepository = {
    async create(input: PostDBType) {
        return await postCollection.insertOne(input)
    },

    async update(id: string, input: InputPostType) {
        return await postCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                ...input,
                blogId: new ObjectId(input.blogId).toString()
            }
        })
    },

    async delete(id: string) {
        return await postCollection.deleteOne({_id: new ObjectId(id)})
    }
}