import {Router} from "express";
import {
    createBlogController,
    deleteBlogController,
    findBlogController,
    getBlogs,
    updateBlogController
} from "../02-controllers/blogsController";
import {authBasicMiddleware} from "../../middlewares/authBasicMiddleware";
import {errorsValidationResultMiddleware} from "../../validators/errorsValidationMiddleware";
import {createPostForBlogIdParams, getPostsByBlogIdParams} from "../../03-posts/02-controllers/postsController";
import {postBodyValidationForBlogIdParams} from "../../validators/postsValidator";
import {blogBodyValidation} from "../../validators/blogsValidator";

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