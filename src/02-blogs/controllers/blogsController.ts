import {Request, Response} from "express"
import {BlogType, InputBlogType} from "../../04-input-output-types/blogType";
import {BlogsMongoDBRepository} from "../repository/blogs-mongoDB-repository";
import {ObjectId} from "mongodb";

export const getBlogsController = async (req: Request,
                                      res: Response<BlogType[]>) => {
    const blogs = await BlogsMongoDBRepository.find()
    return res.status(200).json(blogs)
}

export const findBlogController = async (req: Request<{id: string}>,
                                         res: Response<BlogType | {}>) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send()
        return
    }
    const foundBlog = await BlogsMongoDBRepository.findById(req.params.id)
    if (foundBlog) {
        res.status(200).json(foundBlog)
    } else {
        res.sendStatus(404)
    }
}

export const createBlogController = async (req: Request<{}, {}, InputBlogType>,
                                           res: Response<BlogType>) => {
    const newBlog = await BlogsMongoDBRepository.create(req.body)
    res.status(201).json(newBlog)
}

export const updateBlogController = async (req: Request<{id: string}, {}, InputBlogType>,
                                           res: Response<BlogType>) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send()
        return
    }
    const updatedBlog = await BlogsMongoDBRepository.update(req.params.id, req.body)
    if (updatedBlog) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}

export const deleteBlogController = async (req: Request<{id: string}>,
                                           res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send()
        return
    }
    const isDelete = await BlogsMongoDBRepository.delete(req.params.id)
    if (isDelete) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}