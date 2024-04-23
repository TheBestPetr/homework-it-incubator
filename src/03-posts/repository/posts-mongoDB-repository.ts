import {InputPostType, PostType} from "../../04-input-output-types/postType";
import {postCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";

export const PostsMongoDBRepository = {
    async find() {
        return await postCollection.find().toArray()
    },

    async findById(id: string): Promise<PostType | null> {
        const objId = new ObjectId(id)
        const post = await postCollection.findOne({_id: objId})
        if (post) {
            return post
        } else {
            return null
        }
    },

     async create(input: InputPostType, name: string): Promise<PostType> {
        const newPost: PostType = {
                 _id: new ObjectId(),
                 ...input,
                 blogId: new ObjectId(input.blogId),
                 blogName: name,
                // createdAt: new Date().toISOString()
             }
             await postCollection.insertOne(newPost)
             return newPost
     },

    async update(id: string, input: InputPostType): Promise<boolean> {
        const ObjId = new ObjectId(id)
        const blogUpd = {
            ...input,
            blogId: new ObjectId(input.blogId)
        }
        const result = await postCollection.updateOne({_id: ObjId}, {$set: {...blogUpd}})
        return !!result.matchedCount
    },

    async delete(id: string): Promise<boolean> {
        const ObjId = new ObjectId(id)
        const result = await postCollection.deleteOne({_id: ObjId})
        return result.deletedCount === 1
    }
}