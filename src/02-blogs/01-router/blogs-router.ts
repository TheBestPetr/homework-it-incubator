import {Router} from "express";
import {
    createBlogController,
    deleteBlogController,
    findBlogController,
    getBlogs,
    updateBlogController
} from "../02-controllers/blogs-controller";
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {createPostForBlogIdParams, getPostsByBlogIdParams} from "../../03-posts/02-controllers/posts-controller";
import {postBodyValidationForBlogIdParams} from "../../validators/posts-validator";
import {blogBodyValidation} from "../../validators/blogs-validator";

export const blogsRouter = Router()

blogsRouter.get('/',
    getBlogs)
blogsRouter.post('/',
    authBasicMiddleware,
    blogBodyValidation,
    errorsValidationResultMiddleware,
    createBlogController)
blogsRouter.get('/:id',
    findBlogController)
blogsRouter.put('/:id',
    authBasicMiddleware,
    blogBodyValidation,
    errorsValidationResultMiddleware,
    updateBlogController)
blogsRouter.delete('/:id',
    authBasicMiddleware,
    deleteBlogController)
blogsRouter.get('/:blogId/posts',
    getPostsByBlogIdParams)
blogsRouter.post('/:blogId/posts',
    authBasicMiddleware,
    postBodyValidationForBlogIdParams,
    errorsValidationResultMiddleware,
    createPostForBlogIdParams)