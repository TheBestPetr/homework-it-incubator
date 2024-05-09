import {Router} from "express"
import {
    createPostController,
    deletePostController,
    findPostController,
    getPosts,
    updatePostController
} from "../02-controllers/postsController";
import {authBasicMiddleware} from "../../middlewares/authBasicMiddleware";
import {errorsValidationResultMiddleware} from "../../validators/errorsValidationMiddleware";
import {postBodyValidation} from "../../validators/postsValidator";
import {createCommentController, getCommentsByPostIdParams} from "../../06-comments/02-controllers/commentsController";
import {commentBodyValidation} from "../../validators/commentsValidator";
import {authBearerMiddleware} from "../../middlewares/authBearerMiddleware";

export const postsRouter = Router()

postsRouter.get('/',
    getPosts)
postsRouter.post('/',
    authBasicMiddleware,
    postBodyValidation,
    errorsValidationResultMiddleware,
    createPostController)
postsRouter.get('/:id',
    findPostController)
postsRouter.put('/:id',
    authBasicMiddleware,
    postBodyValidation,
    errorsValidationResultMiddleware,
    updatePostController)
postsRouter.delete('/:id',
    authBasicMiddleware,
    deletePostController)
postsRouter.post('/:postId/comments',
    authBearerMiddleware,
    commentBodyValidation,
    errorsValidationResultMiddleware,
    createCommentController)
postsRouter.get('/:postId/comments',
    getCommentsByPostIdParams)