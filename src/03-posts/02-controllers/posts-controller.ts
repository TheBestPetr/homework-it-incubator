import {Request, Response} from "express";
import {
    InputBlogPostType,
    InputPostQueryType,
    InputPostType,
    OutputPostQueryType,
    OutputPostType
} from "../../types/input-output-types/post-type";
import {ObjectId} from "mongodb";
import {postsService} from "../03-service/posts-service";
import {sortNPagingPostQuery} from "../../helpers/query-helper";
import {postsMongoQueryRepository} from "../04-repository/posts-mongo-query-repository";
import {blogsMongoQueryRepository} from "../../02-blogs/04-repository/blogs-mongo-query-repository";

class PostsController {
    async findPosts(req: Request<{}, {}, {}, InputPostQueryType>,
                    res: Response<OutputPostQueryType>) {
        const query = sortNPagingPostQuery(req.query)
        const posts = await postsMongoQueryRepository.find(query)
        return res.status(200).json(posts)
    }

    async findPostsByParamsBlogId(req: Request<{ blogId: string }, {}, {}, InputPostQueryType>,
                                  res: Response<OutputPostQueryType | {}>) {
        const isBlogExist = await blogsMongoQueryRepository.findById(req.params.blogId)
        if (!ObjectId.isValid(req.params.blogId) || !isBlogExist) {
            res.sendStatus(404)
            return
        }
        const query = sortNPagingPostQuery(req.query)
        const posts = await postsMongoQueryRepository.findPostsByBlogId(query, req.params.blogId)
        if (posts) {
            res.status(200).send(posts)
        } else {
            res.sendStatus(404)
        }
    }

    async findPostById(req: Request<{ id: string }>,
                       res: Response<OutputPostType | {}>) {
        if (!ObjectId.isValid(req.params.id)) {
            res.sendStatus(404)
            return
        }
        const foundPost = await postsMongoQueryRepository.findById(req.params.id)
        if (foundPost) {
            res.status(200).json(foundPost)
        } else {
            res.sendStatus(404)
        }
    }

    async createPostController(req: Request<{ id: string }, {}, InputPostType>,
                               res: Response<OutputPostType | {}>) {
        const newPost = await postsService.create(req.body)
        if (!newPost) {
            res.sendStatus(404)
        } else {
            res.status(201).json(newPost)
        }
    }

    async createPostByParamsBlogId(req: Request<{ blogId: string }, {}, InputBlogPostType>,
                                    res: Response<OutputPostType | {}>) {
        const isBlogExist = await blogsMongoQueryRepository.findById(req.params.blogId)
        if (!ObjectId.isValid(req.params.blogId) || !isBlogExist) {
            res.sendStatus(404)
            return
        }
        const newPost = await postsService.createPostForBlogIdParams(req.params.blogId, req.body)
        if (!newPost) {
            res.sendStatus(404)
        } else {
            res.status(201).json(newPost)
        }
    }

    async updatePostController(req: Request<{ id: string }, {}, InputPostType>,
                               res: Response<OutputPostType | {}>) {
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

    async deletePostController(req: Request<{ id: string }>,
                               res: Response) {
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
}

export const postsController = new PostsController()