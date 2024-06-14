import {InputCommentType, OutputCommentType} from "../../types/input-output-types/comment-type";
import {UsersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";
import {CommentDbType} from "../../types/db-types/comment-db-type";
import {CommentsMongoRepository} from "../04-repository/comments-mongo-repository";
import {CommentsMongoQueryRepository} from "../04-repository/comments-mongo-query-repository";

export class CommentsService {
    private commentsMongoRepository: CommentsMongoRepository
    private commentsMongoQueryRepository: CommentsMongoQueryRepository
    private usersMongoQueryRepository: UsersMongoQueryRepository

    constructor() {
        this.commentsMongoRepository = new CommentsMongoRepository()
        this.commentsMongoQueryRepository = new CommentsMongoQueryRepository()
        this.usersMongoQueryRepository = new UsersMongoQueryRepository()
    }

    async create(content: InputCommentType, commentatorId: string, postId: string): Promise<OutputCommentType> {
        const user = await this.usersMongoQueryRepository.findById(commentatorId)
        const newComment: CommentDbType = { //todo something
            postId: postId,
            content: content.content,
            commentatorInfo: {
                userId: user!.userId,
                userLogin: user!.login
            },
            createdAt: new Date().toISOString()
        }
        const insertedComment = await this.commentsMongoRepository.create(newComment)
        return {
            id: insertedComment.id.toString(),
            content: content.content,
            commentatorInfo: {
                userId: user!.userId,
                userLogin: user!.login
            },
            createdAt: newComment.createdAt
        }
    }

    async update(input: InputCommentType, commentId: string): Promise<boolean> {
        const result = await this.commentsMongoRepository.update(input, commentId)
        return result.matchedCount === 1
    }

    async isUserCanDoThis(userId: string, commentId: string): Promise<boolean> {
        const comment = await this.commentsMongoQueryRepository.findById(commentId)
        return userId === comment?.commentatorInfo.userId;

    }

    async delete(id: string) {
        const result = await this.commentsMongoRepository.delete(id)
        return result.deletedCount === 1
    }
}