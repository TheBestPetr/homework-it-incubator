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
import {createBlogPostController, getPostsByBlogId} from "../../03-posts/02-controllers/postsController";
import {postBodyValidation} from "../../middlewares/postsValidationMiddleware";
import {blogBodyValidation} from "../../middlewares/blogsValidationMiddleware";

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
    getPostsByBlogId)
blogsRouter.post('/:blogId/posts',
    authMiddleware,
    postBodyValidation,
    createBlogPostController)