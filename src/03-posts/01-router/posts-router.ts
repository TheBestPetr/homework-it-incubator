import {Router} from "express"
import {postsController} from "../02-controllers/posts-controller";
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {postBodyValidation} from "../../validators/posts-validator";
import {createCommentController, getCommentsByPostIdParams} from "../../06-comments/02-controllers/comments-controller";
import {commentBodyValidation} from "../../validators/comments-validator";
import {authBearerMiddleware} from "../../middlewares/auth-bearer-middleware";

export const postsRouter = Router()

postsRouter.get('/',
    postsController.findPosts)
postsRouter.post('/',
    authBasicMiddleware,
    postBodyValidation,
    errorsValidationResultMiddleware,
    postsController.createPostController)
postsRouter.get('/:id',
    postsController.findPostById)
postsRouter.put('/:id',
    authBasicMiddleware,
    postBodyValidation,
    errorsValidationResultMiddleware,
    postsController.updatePostController)
postsRouter.delete('/:id',
    authBasicMiddleware,
    postsController.deletePostController)
postsRouter.post('/:postId/comments',
    authBearerMiddleware,
    commentBodyValidation,
    errorsValidationResultMiddleware,
    createCommentController)
postsRouter.get('/:postId/comments',
    getCommentsByPostIdParams)