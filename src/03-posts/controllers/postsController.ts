import {Request, Response} from "express";
import {InputPostType, PostType} from "../../04-input-output-types/postType";
import {PostsMongoRepository} from "../repository/posts-mongo-repository";

export const getPostsController = async (req: Request,
                                res: Response<PostType[]>) => {
    const posts = await PostsMongoRepository.find()
    return res.status(200).json(posts)
}

export const findPostController = async (req: Request<{id: string}>,
                                   res: Response<PostType | {}>) => {
    const foundPost = await PostsMongoRepository.findById(req.params.id)
    if (foundPost) {
        res.status(200).json(foundPost)
    } else {
        res.sendStatus(404)
    }
}

export const createPostController = async (req: Request<{}, {}, InputPostType>,
                                     res: Response<PostType | Object>) => {
    const newPost = await PostsMongoRepository.create(req.body)
    if (!newPost) {
        res.status(400).json('Input blogId does not exist')
    } else {
        res.status(201).json(newPost)
    }
}

export const updatePostController = async (req: Request<{id: string}, {}, InputPostType>,
                                     res: Response<PostType>) => {
    const updatedPost = await PostsMongoRepository.update(req.params.id, req.body)
    if (updatedPost) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}

export const deletePostController = async (req: Request<{id: string}>,
                                     res: Response) => {
    const isDelete = await PostsMongoRepository.delete(req.params.id)
    if (isDelete) {
        res.send(204)
    } else {
        res.send(404)
    }
}