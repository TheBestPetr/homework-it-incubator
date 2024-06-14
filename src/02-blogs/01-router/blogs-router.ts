import {Router} from "express";
import {blogsController} from "../02-controllers/blogs-controller";
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {postsController} from "../../03-posts/02-controllers/posts-controller";
import {postBodyValidationForParamsBlogId} from "../../validators/posts-validator";
import {blogBodyValidation} from "../../validators/blogs-validator";

export const blogsRouter = Router()

blogsRouter.get('/',
    blogsController.findBlogs.bind(blogsController))

blogsRouter.post('/',
    authBasicMiddleware,
    blogBodyValidation,
    errorsValidationResultMiddleware,
    blogsController.createBlogController.bind(blogsController))

blogsRouter.get('/:id',
    blogsController.findBlogById.bind(blogsController))

blogsRouter.put('/:id',
    authBasicMiddleware,
    blogBodyValidation,
    errorsValidationResultMiddleware,
    blogsController.updateBlogController.bind(blogsController))

blogsRouter.delete('/:id',
    authBasicMiddleware,
    blogsController.deleteBlogController.bind(blogsController))

blogsRouter.get('/:blogId/posts',
    postsController.findPostsByParamsBlogId.bind(postsController))

blogsRouter.post('/:blogId/posts',
    authBasicMiddleware,
    postBodyValidationForParamsBlogId,
    errorsValidationResultMiddleware,
    postsController.createPostByParamsBlogId.bind(postsController))