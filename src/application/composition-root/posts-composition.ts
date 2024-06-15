import {PostsMongoRepository} from "../../03-posts/04-repository/posts-mongo-repository";
import {PostsMongoQueryRepository} from "../../03-posts/04-repository/posts-mongo-query-repository";
import {PostsService} from "../../03-posts/03-service/posts-service";
import {PostsController} from "../../03-posts/02-controllers/posts-controller";
import {BlogsMongoQueryRepository} from "../../02-blogs/04-repository/blogs-mongo-query-repository";

const postsMongoRepository = new PostsMongoRepository()
const postsMongoQueryRepository = new PostsMongoQueryRepository()
const blogsMongoQueryRepository = new BlogsMongoQueryRepository()
const postsService = new PostsService(
    postsMongoRepository,
    blogsMongoQueryRepository
)
export const postsController = new PostsController(
    postsService,
    postsMongoQueryRepository,
    blogsMongoQueryRepository
)