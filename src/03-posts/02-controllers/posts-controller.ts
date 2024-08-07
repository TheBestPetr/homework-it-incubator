import {Request, Response} from "express";
import {
    InputBlogPostType,
    InputPostQueryType,
    InputPostType,
    OutputPostQueryType,
    OutputPostType
} from "../../types/input-output-types/post-type";
import {ObjectId} from "mongodb";
import {sortNPagingPostQuery} from "../../helpers/query-helper";
import {PostsMongoQueryRepository} from "../04-repository/posts-mongo-query-repository";
import {BlogsMongoQueryRepository} from "../../02-blogs/04-repository/blogs-mongo-query-repository";
import {PostsService} from "../03-service/posts-service";
import {InputLikeType} from "../../types/input-output-types/comment-type";

export class PostsController {
    constructor(
        protected postsService: PostsService,
        protected postsMongoQueryRepository: PostsMongoQueryRepository,
        protected blogsMongoQueryRepository: BlogsMongoQueryRepository
    ) {
    }

    async findPosts(req: Request<{}, {}, {}, InputPostQueryType>,
                    res: Response<OutputPostQueryType>) {
        const query = sortNPagingPostQuery(req.query)
        const posts = await this.postsMongoQueryRepository.find(query, req.headers.authorization)
        return res.status(200).json(posts)
    }

    async findPostsByParamsBlogId(req: Request<{ blogId: string }, {}, {}, InputPostQueryType>,
                                  res: Response<OutputPostQueryType | {}>) {
        const isBlogExist = await this.blogsMongoQueryRepository.findById(req.params.blogId)
        if (!ObjectId.isValid(req.params.blogId) || !isBlogExist) {
            res.sendStatus(404)
            return
        }
        const query = sortNPagingPostQuery(req.query)
        const posts = await this.postsMongoQueryRepository.findPostsByBlogId(query, req.params.blogId, req.headers.authorization)
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
        const foundPost = await this.postsMongoQueryRepository.findById(req.params.id, req.headers.authorization)
        if (foundPost) {
            res.status(200).json(foundPost)
        } else {
            res.sendStatus(404)
        }
    }

    async createPostController(req: Request<{ id: string }, {}, InputPostType>,
                               res: Response<OutputPostType | {}>) {
        const newPost = await this.postsService.create(req.body)
        if (!newPost) {
            res.sendStatus(404)
        } else {
            res.status(201).json(newPost)
        }
    }

    async createPostByParamsBlogId(req: Request<{ blogId: string }, {}, InputBlogPostType>,
                                   res: Response<OutputPostType | {}>) {
        const isBlogExist = await this.blogsMongoQueryRepository.findById(req.params.blogId)
        if (!ObjectId.isValid(req.params.blogId) || !isBlogExist) {
            res.sendStatus(404)
            return
        }
        const newPost = await this.postsService.createPostForBlogIdParams(req.params.blogId, req.body)
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
        const updatedPost = await this.postsService.update(req.params.id, req.body)
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
        const isDelete = await this.postsService.delete(req.params.id)
        if (isDelete) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

    async updatePostLikeStatus(req: Request<{ id: string }, {}, InputLikeType>,
                               res: Response) {
        if (!ObjectId.isValid(req.params.id)) {
            res.sendStatus(404)
            return
        }
        const post = await this.postsMongoQueryRepository.findById(req.params.id)
        if (!post) {
            res.sendStatus(404)
            return
        }
        const isUpdate = await this.postsService.updateLikeStatus(req.params.id, req.headers.authorization!, req.body.likeStatus)
        if (isUpdate) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(505)
    }
}