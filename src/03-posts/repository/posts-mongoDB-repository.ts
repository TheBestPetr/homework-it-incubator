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
            const {_id, ...result} = post
            return {...result, id: _id}
        } else {
            return null
        }
    },

    async create(input: InputPostType, name: string): Promise<PostType> {
        const createdPost: PostType = {
            id: new ObjectId(),
            ...input,
            blogId: new ObjectId(input.blogId),
            blogName: name,
            //createdAt: new Date().toISOString()
        }
        const insertedPost = await postCollection.insertOne(createdPost)
        return {
            id: insertedPost.insertedId,
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName
        }
    },

    async update(id: string, input: InputPostType): Promise<boolean> {
        const ObjId = new ObjectId(id)
        const result = await postCollection.updateOne({_id: ObjId}, {
            $set: {
                ...input,
                blogId: new ObjectId(input.blogId)
            }
        })
        return !!result.matchedCount
    },

    async delete(id: string): Promise<boolean> {
        const ObjId = new ObjectId(id)
        const result = await postCollection.deleteOne({_id: ObjId})
        return result.deletedCount === 1
    }
}