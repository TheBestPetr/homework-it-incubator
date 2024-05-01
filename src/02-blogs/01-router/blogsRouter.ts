import {Router} from "express";
import {
    createBlogController,
    deleteBlogController,
    findBlogController,
    getBlogs,
    updateBlogController
} from "../02-controllers/blogsController";
import {authMiddleware} from "../../middlewares/authMiddleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errorsValidationMiddleware";
import {createPostForBlogIdParams, getPostsByBlogIdParams} from "../../03-posts/02-controllers/postsController";
import {postBodyValidation} from "../../middlewares/postsValidator";
import {blogBodyValidation} from "../../middlewares/blogsValidator";

export const blogsRouter = Router()

blogsRouter.get('/',
    getBlogs)
blogsRouter.post('/',
    authMiddleware,
    blogBodyValidation,
    errorsValidationResultMiddleware,
    createBlogController)
blogsRouter.get('/:id',
    findBlogController)
blogsRouter.put('/:id',
    authMiddleware,
    blogBodyValidation,
    errorsValidationResultMiddleware,
    updateBlogController)
blogsRouter.delete('/:id',
    authMiddleware,
    deleteBlogController)
blogsRouter.get('/:blogId/posts',
    getPostsByBlogIdParams)
blogsRouter.post('/:blogId/posts',
    authMiddleware,
    postBodyValidation,
    errorsValidationResultMiddleware,
    createPostForBlogIdParams)