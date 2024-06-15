import {Request, Response} from "express"
import {
    OutputBlogType,
    InputBlogType,
    OutputBlogQueryType,
    InputBlogQueryType
} from "../../types/input-output-types/blog-type";
import {ObjectId} from "mongodb";
import {BlogsService} from "../03-service/blogs-service";
import {BlogsMongoQueryRepository} from "../04-repository/blogs-mongo-query-repository";
import {sortNPagingBlogQuery} from "../../helpers/query-helper";

export class BlogsController {
    constructor(
        protected blogsService: BlogsService,
        protected blogsMongoQueryRepository: BlogsMongoQueryRepository
    ) {}

    async findBlogs(req: Request<{}, {}, {}, InputBlogQueryType>,
                    res: Response<OutputBlogQueryType>) {
        const query = sortNPagingBlogQuery(req.query)
        const blogs = await this.blogsMongoQueryRepository.find(query)
        res.status(200).send(blogs)
    }

    async findBlogById(req: Request<{ id: string }>,
                       res: Response<OutputBlogType | {}>) {
        if (!ObjectId.isValid(req.params.id)) {
            res.sendStatus(404)
            return
        }
        const foundBlog = await this.blogsMongoQueryRepository.findById(req.params.id)
        if (foundBlog) {
            res.status(200).send(foundBlog)
        } else {
            res.sendStatus(404)
        }
    }

    async createBlogController(req: Request<{}, {}, InputBlogType>,
                               res: Response<OutputBlogType>) {
        const newBlog = await this.blogsService.create(req.body)
        res.status(201).send(newBlog)
    }

    async updateBlogController(req: Request<{ id: string }, {}, InputBlogType>,
                               res: Response<OutputBlogType>) {
        if (!ObjectId.isValid(req.params.id)) {
            res.sendStatus(404)
            return
        }
        const updatedBlog = await this.blogsService.update(req.params.id, req.body)
        if (updatedBlog) {
            res.sendStatus(204)
        }
        res.sendStatus(404)
    }

    async deleteBlogController(req: Request<{ id: string }>,
                               res: Response) {
        if (!ObjectId.isValid(req.params.id)) {
            res.sendStatus(404)
            return
        }
        const isDelete = await this.blogsService.delete(req.params.id)
        if (isDelete) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
}