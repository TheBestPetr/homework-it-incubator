import {Router} from "express"
import {authBasicMiddleware} from "../../middlewares/auth-basic-middleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {postBodyValidation} from "../../validators/posts-validator";
import {commentBodyValidation} from "../../validators/comments-validator";
import {authBearerMiddleware} from "../../middlewares/auth-bearer-middleware";
import {postsController} from "../../application/composition-root/posts-composition";
import {commentsController} from "../../application/composition-root/comments-composition";

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