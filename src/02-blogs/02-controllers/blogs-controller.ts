import {Request, Response} from "express"
import {OutputBlogType, InputBlogType, OutputBlogQueryType, InputBlogQueryType} from "../../types/input-output-types/blog-type";
import {ObjectId} from "mongodb";
import {blogsService} from "../03-service/blogs-service";
import {blogsMongoQueryRepository} from "../04-repository/blogs-mongo-query-repository";
import {sortNPagingBlogQuery} from "../../helpers/query-helper";

export const getBlogs = async (req: Request<{}, {}, {}, InputBlogQueryType>,
                               res: Response<OutputBlogQueryType>) => {
    const query = sortNPagingBlogQuery(req.query)
    const blogs = await blogsMongoQueryRepository.find(query)
    res.status(200).send(blogs)
}

export const findBlogController = async (req: Request<{ id: string }>,
                                         res: Response<OutputBlogType | {}>) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404)
        return
    }
    const foundBlog = await blogsMongoQueryRepository.findById(req.params.id)
    if (foundBlog) {
        res.status(200).send(foundBlog)
    } else {
        res.sendStatus(404)
    }
}

export const createBlogController = async (req: Request<{}, {}, InputBlogType>,
                                           res: Response<OutputBlogType>) => {
    const newBlog = await blogsService.create(req.body)
    res.status(201).send(newBlog)
}

export const updateBlogController = async (req: Request<{ id: string }, {}, InputBlogType>,
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

export const deleteBlogController = async (req: Request<{ id: string }>,
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