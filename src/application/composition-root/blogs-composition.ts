import {BlogsMongoRepository} from "../../02-blogs/04-repository/blogs-mongo-repository";
import {BlogsService} from "../../02-blogs/03-service/blogs-service";
import {BlogsController} from "../../02-blogs/02-controllers/blogs-controller";
import {BlogsMongoQueryRepository} from "../../02-blogs/04-repository/blogs-mongo-query-repository";

const blogsMongoRepository = new BlogsMongoRepository()
const blogsMongoQueryRepository = new BlogsMongoQueryRepository()
const blogsService = new BlogsService(blogsMongoRepository)
export const blogsController = new BlogsController(
    blogsService,
    blogsMongoQueryRepository
)