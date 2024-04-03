import {Request, Response} from "express"
import {BlogType, InputBlogType} from "../../04-input-output-types/blogType";
import {BlogsMongoRepository} from "../repository/blogs-mongo-repository";

export const getBlogsController = async (req: Request,
                                      res: Response<BlogType[]>) => {
    const blogs = await BlogsMongoRepository.find()
    return res.status(200).json(blogs)
}

export const findBlogController = async (req: Request<{id: string}>,
                                         res: Response<BlogType | {}>) => {
    const foundBlog = await BlogsMongoRepository.findById(req.params.id)
    if (foundBlog) {
        res.status(200).json(foundBlog)
    } else {
        res.sendStatus(404)
    }
}

export const createBlogController = async (req: Request<{}, {}, InputBlogType>,
                                           res: Response<BlogType>) => {
    const newBlog = await BlogsMongoRepository.create(req.body)
    res.status(201).json(newBlog)
}

export const updateBlogController = async (req: Request<{id: string}, {}, InputBlogType>,
                                           res: Response<BlogType>) => {
    const updatedBlog = await BlogsMongoRepository.update(req.params.id, req.body)
    if (updatedBlog) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}

export const deleteBlogController = async (req: Request<{id: string}>,
                                           res: Response) => {
    const isDelete = await BlogsMongoRepository.delete(req.params.id)
    if (isDelete) {
        res.send(204)
    } else {
        res.send(404)
    }
}