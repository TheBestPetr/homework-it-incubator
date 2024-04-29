import {Request, Response} from "express"
import {OutputBlogType, InputBlogType} from "../../04-input-output-types/blogType";
import {ObjectId} from "mongodb";
import {blogsService} from "../03-service/blogsService";

export const getBlogs = async (req: Request,
                                      res: Response<OutputBlogType[]>) => {
    const blogs = await blogsService.find()
    return res.status(200).json(blogs)
}

export const findBlogController = async (req: Request<{id: string}>,
                                         res: Response<OutputBlogType | {}>) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404)
        return
    }
    const foundBlog = await blogsService.findById(req.params.id)
    if (foundBlog) {
        res.status(200).json(foundBlog)
    } else {
        res.sendStatus(404)
    }
}

export const createBlogController = async (req: Request<{}, {}, InputBlogType>,
                                           res: Response<OutputBlogType>) => {
    const newBlog = await blogsService.create(req.body)
    res.status(201).json(newBlog)
}

export const updateBlogController = async (req: Request<{id: string}, {}, InputBlogType>,
                                           res: Response<OutputBlogType>) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404)
        return
    }
    const updatedBlog = await blogsService.update(req.params.id, req.body)
    if (updatedBlog) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}

export const deleteBlogController = async (req: Request<{id: string}>,
                                           res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404)
        return
    }
    const isDelete = await blogsService.delete(req.params.id)
    if (isDelete) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}