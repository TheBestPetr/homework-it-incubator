import {Router} from "express";
import {blogsController} from "../02-controllers/blogs-controller";
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {postsController} from "../../03-posts/02-controllers/posts-controller";
import {postBodyValidationForBlogIdParams} from "../../validators/posts-validator";
import {blogBodyValidation} from "../../validators/blogs-validator";

export const blogsRouter = Router()

blogsRouter.get('/',
    blogsController.findBlogs)
blogsRouter.post('/',
    authBasicMiddleware,
    blogBodyValidation,
    errorsValidationResultMiddleware,
    blogsController.createBlogController)
blogsRouter.get('/:id',
    blogsController.findBlogById)
blogsRouter.put('/:id',
    authBasicMiddleware,
    blogBodyValidation,
    errorsValidationResultMiddleware,
    blogsController.updateBlogController)
blogsRouter.delete('/:id',
    authBasicMiddleware,
    blogsController.deleteBlogController)
blogsRouter.get('/:blogId/posts',
    postsController.findPostsByParamsBlogId)
blogsRouter.post('/:blogId/posts',
    authBasicMiddleware,
    postBodyValidationForBlogIdParams,
    errorsValidationResultMiddleware,
    postsController.createPostByParamsBlogId)