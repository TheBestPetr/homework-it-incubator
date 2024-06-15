import {Router} from "express";
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {postBodyValidationForParamsBlogId} from "../../validators/posts-validator";
import {blogBodyValidation} from "../../validators/blogs-validator";
import {blogsController} from "../../application/composition-root/blogs-composition";
import {postsController} from "../../application/composition-root/posts-composition";

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