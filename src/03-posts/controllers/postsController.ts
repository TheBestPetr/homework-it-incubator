import {Request, Response} from "express";
import {InputPostType, OutputPostType} from "../../04-input-output-types/postType";
import {PostsMongoDBRepository} from "../repository/posts-mongoDB-repository";
import {BlogsMongoDBRepository} from "../../02-blogs/repository/blogs-mongoDB-repository";
import {ObjectId} from "mongodb";

export const getPostsController = async (req: Request,
                                         res: Response<OutputPostType[]>) => {
    const posts = await PostsMongoDBRepository.find()
    return res.status(200).json(posts)
}

export const findPostController = async (req: Request<{ id: string }>,
                                         res: Response<OutputPostType | {}>) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send()
        return
    }
    const foundPost = await PostsMongoDBRepository.findById(req.params.id)
    if (foundPost) {
        res.status(200).json(foundPost)
    } else {
        res.sendStatus(404)
    }
}

export const createPostController = async (req: Request<{ id: string }, {}, InputPostType>,
                                           res: Response<OutputPostType | {}>) => {
    const blog = await BlogsMongoDBRepository.findById(req.body.blogId)
    const newPost = await PostsMongoDBRepository.create(req.body, blog!.name)
    if (!newPost) {
        res.status(400).json()
    } else {
        res.status(201).json(newPost)
    }
}

export const updatePostController = async (req: Request<{ id: string }, {}, InputPostType>,
                                           res: Response<OutputPostType | {}>) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send()
        return
    }
    const updatedPost = await PostsMongoDBRepository.update(req.params.id, req.body)
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
    const isDelete = await PostsMongoDBRepository.delete(req.params.id)
    if (isDelete) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}