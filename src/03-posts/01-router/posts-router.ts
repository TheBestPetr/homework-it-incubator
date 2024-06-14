import {Router} from "express"
import {postsController} from "../02-controllers/posts-controller";
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {postBodyValidation} from "../../validators/posts-validator";
import {commentsController} from "../../06-comments/02-controllers/comments-controller";
import {commentBodyValidation} from "../../validators/comments-validator";
import {authBearerMiddleware} from "../../middlewares/auth-bearer-middleware";

export const postsRouter = Router()

postsRouter.get('/',
    postsController.findPosts.bind(postsController))

postsRouter.post('/',
    authBasicMiddleware,
    postBodyValidation,
    errorsValidationResultMiddleware,
    postsController.createPostController.bind(postsController))

postsRouter.get('/:id',
    postsController.findPostById.bind(postsController))

postsRouter.put('/:id',
    authBasicMiddleware,
    postBodyValidation,
    errorsValidationResultMiddleware,
    postsController.updatePostController.bind(postsController))

postsRouter.delete('/:id',
    authBasicMiddleware,
    postsController.deletePostController.bind(postsController))

postsRouter.post('/:postId/comments',
    authBearerMiddleware,
    commentBodyValidation,
    errorsValidationResultMiddleware,
    commentsController.createCommentController)

postsRouter.get('/:postId/comments',
    commentsController.findCommentsByParamsPostId)