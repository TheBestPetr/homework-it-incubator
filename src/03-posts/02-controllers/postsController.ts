import {Request, Response} from "express";
import {InputBlogPostType, InputPostType, OutputPostType} from "../../04-input-output-types/postType";
import {ObjectId} from "mongodb";
import {postsService} from "../03-service/postsService";
import {blogsService} from "../../02-blogs/03-service/blogsService";

export const getPosts = async (req: Request,// delete controller
                                         res: Response<OutputPostType[]>) => {
    const posts = await postsService.find()
    return res.status(200).json(posts)
}

export const getPostsByBlogId = async (req: Request<{blogId: string}>,
                                       res: Response<OutputPostType[] | {}>) => {
    if (!ObjectId.isValid(req.params.blogId)) {
        res.sendStatus(404)
        return
    }
    const blog = await blogsService.findById(req.params.blogId)
    if (!blog) {
        res.sendStatus(404)
    }

    const posts = await postsService.findPostsByBlogId(req.params.blogId)
    if (posts) {
        res.status(200).send(posts)
    } else {
        res.sendStatus(404)
    }
}

export const findPostController = async (req: Request<{ id: string }>,
                                         res: Response<OutputPostType | {}>) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404)
        return
    }
    const foundPost = await postsService.findById(req.params.id)
    if (foundPost) {
        res.status(200).json(foundPost)
    } else {
        res.sendStatus(404)
    }
}

export const createPostController = async (req: Request<{ id: string }, {}, InputPostType>,
                                           res: Response<OutputPostType | {}>) => {
    const newPost = await postsService.create(req.body)
    if (!newPost) {
        res.sendStatus(404)
    } else {
        res.status(201).json(newPost)
    }
}

export const createBlogPostController = async (req: Request<{blogId: string}, {}, InputBlogPostType>,
                                               res: Response<OutputPostType | {}>) => {
    if (!ObjectId.isValid(req.params.blogId)) {
        res.sendStatus(404)
        return
    }
    const newPost = await postsService.createBlogPost(req.params.blogId, req.body)
    if (!newPost) {
        res.sendStatus(404)
    } else {
        res.status(201).json(newPost)
    }
}

export const updatePostController = async (req: Request<{ id: string }, {}, InputPostType>,
                                           res: Response<OutputPostType | {}>) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404)
        return
    }
    const updatedPost = await postsService.update(req.params.id, req.body)
    if (updatedPost) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}

export const deletePostController = async (req: Request<{ id: string }>,
                                           res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send()
        return
    }
    const isDelete = await postsService.delete(req.params.id)
    if (isDelete) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}