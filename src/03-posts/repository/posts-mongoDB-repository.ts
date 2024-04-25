import {InputPostType, OutputPostType} from "../../04-input-output-types/postType";
import {postCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {PostDBType} from "../../db/post-db-type";

export const PostsMongoDBRepository = {
    async find() {
        const posts = await postCollection.find().toArray()
        return posts.map(post => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName
        }))
    },

    async findById(id: string): Promise<OutputPostType | null> {
        const objId = new ObjectId(id)
        const post = await postCollection.findOne({_id: objId})
        if (post) {
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName
                //createdAt:
            }
        } else {
            return null
        }
    },

    async create(input: InputPostType, name: string): Promise<OutputPostType> {
        const createdPost: PostDBType = {
            //id: new ObjectId(),
            ...input,
            blogId: new ObjectId(input.blogId).toString(),
            blogName: name,
            //createdAt: new Date().toISOString()
        }
        const insertedPost = await postCollection.insertOne(createdPost)
        return {
            id: insertedPost.insertedId.toString(),
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            //createdAt: createdPost.createdAt
        }
    },

    async update(id: string, input: InputPostType): Promise<boolean> {
        const ObjId = new ObjectId(id)
        const result = await postCollection.updateOne({_id: ObjId}, {
            $set: {
                ...input,
                blogId: new ObjectId(input.blogId).toString()
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