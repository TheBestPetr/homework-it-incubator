import {db} from "../../db/db";
import {BlogType, InputBlogType} from "../../04-input-output-types/blogType";

export const BlogsMongoRepository = {
    async find() {
        return db.blogs
    },

    async findById(id: string): Promise<BlogType> {
        const blogId = db.blogs.findIndex(b => b.id === id)
        return db.blogs[blogId]
    },

    async create(input: InputBlogType): Promise<BlogType> {
        const newBlog: BlogType = {
            id: Date.now() + Math.random().toString(),
            ...input,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        db.blogs = [...db.blogs, newBlog]
        return newBlog
    },

    async update(id: string ,input: InputBlogType): Promise<boolean> {
        const blogToUpdate = db.blogs.findIndex(b => b.id === id)
        if (blogToUpdate !== -1) {
            db.blogs[blogToUpdate] = {
                id,
                ...input,
                createdAt: db.blogs[blogToUpdate].createdAt,
                isMembership: db.blogs[blogToUpdate].isMembership
            }
            return true
        }
        return false
    },

    async delete(id: string): Promise<boolean> {
        const blogIdToDelete = db.blogs.findIndex(b => b.id === id)
        if (blogIdToDelete === -1) {
            return false
        }
        const blogToDelete = db.blogs.splice(blogIdToDelete, 1)
        return !!blogToDelete
    }
}