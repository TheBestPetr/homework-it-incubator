import {db} from "../../db/db";
import {InputPostType, PostType} from "../../04-input-output-types/postType";

export const PostsMongoRepository = {
    async find() {
        return db.posts
    },

    async findById(id: string): Promise<PostType> {
        const postId = db.posts.findIndex(p => p.id === id)
        return db.posts[postId]
    },

    async create(input: InputPostType): Promise<PostType | boolean> {
        const findBlogID = db.blogs.findIndex(b => b.id === input.blogId)
        if (findBlogID === -1) {
            return false
        } else {
            const newPost: PostType = {
            id: Date.now() + Math.random().toString(),
            ...input,
            blogName: db.blogs[findBlogID].name,
                createdAt: new Date().toISOString()
            }
            db.posts = [...db.posts, newPost]
            return newPost
        }
    },

    async update(id: string, input: InputPostType): Promise<boolean> {
        const postToUpdate = db.posts.findIndex(p => p.id === id)
        if (postToUpdate !== -1) {
            db.posts[postToUpdate] = {
                id,
                ...input,
                blogName: db.posts[postToUpdate].blogName,
                createdAt: db.posts[postToUpdate].createdAt
            }
            return true
        }
        return false
    },

    async delete(id: string): Promise<boolean> {
        const postIdToDelete = db.posts.findIndex(p => p.id === id)
        if (postIdToDelete === -1) {
            return false
        }
        const postToDelete = db.posts.splice(postIdToDelete, 1)
        return !!postToDelete
    }
}