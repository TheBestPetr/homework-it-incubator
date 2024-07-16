import {PostsMongoRepository} from "../../03-posts/04-repository/posts-mongo-repository";
import {PostsMongoQueryRepository} from "../../03-posts/04-repository/posts-mongo-query-repository";
import {PostsService} from "../../03-posts/03-service/posts-service";
import {PostsController} from "../../03-posts/02-controllers/posts-controller";
import {BlogsMongoQueryRepository} from "../../02-blogs/04-repository/blogs-mongo-query-repository";
import {PostLikesInfoMongoRepository} from "../../03-posts/04-repository/post-likes-info-mongo-repository";
import {UsersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";

const postsMongoRepository = new PostsMongoRepository()
const postsMongoQueryRepository = new PostsMongoQueryRepository()
const blogsMongoQueryRepository = new BlogsMongoQueryRepository()
const postLikeInfoMongoRepository = new PostLikesInfoMongoRepository()
const usersMongoQueryRepository = new UsersMongoQueryRepository()
const postsService = new PostsService(
    postsMongoRepository,
    blogsMongoQueryRepository,
    postLikeInfoMongoRepository,
    usersMongoQueryRepository
)
export const postsController = new PostsController(
    postsService,
    postsMongoQueryRepository,
    blogsMongoQueryRepository
)