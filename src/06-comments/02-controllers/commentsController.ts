import {Request, Response} from "express";
import {
    InputCommentQueryType,
    InputCommentType,
    OutputCommentQueryType,
    OutputCommentType
} from "../../types/commentType";
import {jwtService} from "../../application/jwtService/jwtService";
import {postsMongoQueryRepository} from "../../03-posts/04-repository/postsMongoQueryRepository";
import {commentsService} from "../03-service/commentsService";
import {commentsMongoQueryRepository} from "../04-repository/commentsMongoQueryRepository";
import {sortNPagingCommentQuery} from "../../helpers/queryHelper";
import {ObjectId} from "mongodb";

export const getCommentsByPostIdParams = async (req: Request<{ postId: string }, {}, Partial<InputCommentQueryType>>,
                                                res: Response<OutputCommentQueryType>) => {
    const isPostExist = await postsMongoQueryRepository.findById(req.params.postId)
    if (!ObjectId.isValid(req.params.postId) || !isPostExist) {
        res.sendStatus(404)
        return
    }
    const query = sortNPagingCommentQuery(req.query)
    const comments = await commentsMongoQueryRepository.findCommentsByPostId(req.params.postId, query)
    if (comments) {
        res.status(200).send(comments)
    } else {
        res.sendStatus(404)
    }
}

export const getCommentById = async (req: Request<{ id: string }>,
                                     res: Response<OutputCommentType>) => {
    const comment = await commentsMongoQueryRepository.findById(req.params.id)
    if (!comment) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(comment)
}

export const createCommentController = async (req: Request<{ postId: string }, {}, InputCommentType>,
                                              res: Response<OutputCommentType>) => {
    if (!req.params.postId || !ObjectId.isValid(req.params.postId)) {
        res.sendStatus(404)
        return
    }
    const post = await postsMongoQueryRepository.findById(req.params.postId)
    if (!post) {
        res.sendStatus(404)
        return
    }
    const commentatorId = await jwtService.getUserIdByToken(req.headers.authorization!)
    if (!commentatorId) {
        res.sendStatus(404)
        return
    }
    const comment = await commentsService.create(req.body, commentatorId, req.params.postId)
    res.status(201).send(comment)
}

export const updateCommentController = async (req: Request<{ commentId: string }, {}, InputCommentType>,
                                              res: Response) => {
    if (!ObjectId.isValid(req.params.commentId) || !req.params.commentId) {
        res.sendStatus(404)
        return
    }
    const userId = await jwtService.getUserIdByToken(req.headers.authorization!)
    const isUserCanDoThis = await commentsService.isUserCanDoThis(userId, req.params.commentId)
    if (!isUserCanDoThis) {
        res.sendStatus(403)
        return
    }
    const updatedComment = await commentsService.update(req.body, req.params.commentId)
    if (!updatedComment) {
        res.sendStatus(404)
        return
    } else {
        res.sendStatus(204)
    }
}

export const deleteCommentController = async (req: Request<{ commentId: string }>,
                                              res: Response) => {
    if (!ObjectId.isValid(req.params.commentId) || !req.params.commentId) {
        res.status(404).send()
        return
    }
    const userId = await jwtService.getUserIdByToken(req.headers.authorization!)
    const isUserCanDoThis = await commentsService.isUserCanDoThis(userId, req.params.commentId)
    if (!isUserCanDoThis) {
        res.sendStatus(403)
        return
    }
    const isDelete = await commentsService.delete(req.params.commentId)
    if (isDelete) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}