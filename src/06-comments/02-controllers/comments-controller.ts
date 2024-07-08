import {Request, Response} from "express";
import {
    InputCommentQueryType,
    InputCommentType, InputLikeType,
    OutputCommentQueryType,
    OutputCommentType
} from "../../types/input-output-types/comment-type";
import {JwtService} from "../../application/jwt-service/jwt-service";
import {PostsMongoQueryRepository} from "../../03-posts/04-repository/posts-mongo-query-repository";
import {CommentsService} from "../03-service/comments-service";
import {CommentsMongoQueryRepository} from "../04-repository/comments-mongo-query-repository";
import {sortNPagingCommentQuery} from "../../helpers/query-helper";
import {ObjectId} from "mongodb";

export class CommentsController {
    constructor(
        protected commentsService: CommentsService,
        protected commentsMongoQueryRepository: CommentsMongoQueryRepository,
        protected postsMongoQueryRepository: PostsMongoQueryRepository,
        protected jwtService: JwtService
    ) {
    }

    async findCommentsByParamsPostId(req: Request<{ postId: string }, {}, Partial<InputCommentQueryType>>,
                                     res: Response<OutputCommentQueryType>) {
        if (!ObjectId.isValid(req.params.postId)) {
            res.sendStatus(404)
            return
        }
        const isPostExist = await this.postsMongoQueryRepository.findById(req.params.postId)
        if (!isPostExist) {
            res.sendStatus(404)
            return
        }
        const query = sortNPagingCommentQuery(req.query)
        const comments = await this.commentsMongoQueryRepository.findCommentsByPostId(req.params.postId, query)
        if (comments) {
            res.status(200).send(comments)
        } else {
            res.sendStatus(404)
        }
    }

    async findCommentById(req: Request<{ id: string }>,
                          res: Response<OutputCommentType>) {
        const comment = await this.commentsMongoQueryRepository.findById(req.params.id, req.headers.authorization)
        if (!comment) {
            res.sendStatus(404)
            return
        }
        res.status(200).send(comment)
    }

    async createCommentController(req: Request<{ postId: string }, {}, InputCommentType>,
                                  res: Response<OutputCommentType>) {
        if (!req.params.postId || !ObjectId.isValid(req.params.postId)) {
            res.sendStatus(404)
            return
        }
        const post = await this.postsMongoQueryRepository.findById(req.params.postId)
        if (!post) {
            res.sendStatus(404)
            return
        }
        const comment = await this.commentsService.create(req.body, req.headers.authorization!, req.params.postId)
        res.status(201).send(comment)
    }

    async updateCommentController(req: Request<{ commentId: string }, {}, InputCommentType>,
                                  res: Response) {
        if (!ObjectId.isValid(req.params.commentId) || !req.params.commentId) {
            res.sendStatus(404)
            return
        }
        const comment = await this.commentsMongoQueryRepository.findById(req.params.commentId)
        if (!comment) {
            res.sendStatus(404)
            return
        }
        const isUserCanDoThis = await this.commentsService.isUserCanDoThis(req.headers.authorization!, req.params.commentId)
        if (!isUserCanDoThis) {
            res.sendStatus(403)
            return
        }
        const updatedComment = await this.commentsService.update(req.body, req.params.commentId)
        if (!updatedComment) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }

    async deleteCommentController(req: Request<{ commentId: string }>,
                                  res: Response) {
        if (!ObjectId.isValid(req.params.commentId) || !req.params.commentId) {
            res.status(404).send()
            return
        }
        const comment = await this.commentsMongoQueryRepository.findById(req.params.commentId)
        if (!comment) {
            res.sendStatus(404)
            return
        }
        const isUserCanDoThis = await this.commentsService.isUserCanDoThis(req.headers.authorization!, req.params.commentId)
        if (!isUserCanDoThis) {
            res.sendStatus(403)
            return
        }
        const isDelete = await this.commentsService.delete(req.params.commentId)
        if (isDelete) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)
    }

    async updateCommentLikeStatus(req: Request<{ commentId: string }, {}, InputLikeType>,
                                  res: Response) {
        if (!ObjectId.isValid(req.params.commentId) || !req.params.commentId) {
            res.sendStatus(404)
            return
        }
        const comment = await this.commentsMongoQueryRepository.findById(req.params.commentId)
        if (!comment) {
            res.sendStatus(404)
            return
        }
        const isUpdate = await this.commentsService.updateLikeStatus(req.params.commentId, req.headers.authorization!, req.body.likeStatus)
        if (isUpdate) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)
    }
}