import {CommentsMongoRepository} from "../../06-comments/04-repository/comments-mongo-repository";
import {CommentsMongoQueryRepository} from "../../06-comments/04-repository/comments-mongo-query-repository";
import {UsersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";
import {CommentsService} from "../../06-comments/03-service/comments-service";
import {CommentsController} from "../../06-comments/02-controllers/comments-controller";
import {PostsMongoQueryRepository} from "../../03-posts/04-repository/posts-mongo-query-repository";
import {JwtService} from "../jwt-service/jwt-service";

const commentsMongoRepository = new CommentsMongoRepository()
const commentsMongoQueryRepository = new CommentsMongoQueryRepository()
const usersMongoQueryRepository = new UsersMongoQueryRepository()
const postsMongoQueryRepository = new PostsMongoQueryRepository()
const jwtService = new JwtService()
const commentsService = new CommentsService(
    commentsMongoRepository,
    commentsMongoQueryRepository,
    usersMongoQueryRepository
)
export const commentsController = new CommentsController(
    commentsService,
    commentsMongoQueryRepository,
    postsMongoQueryRepository,
    jwtService
)