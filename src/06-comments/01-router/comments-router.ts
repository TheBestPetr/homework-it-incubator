import {Router} from "express";
import {commentBodyValidation} from "../../validators/comments-validator";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {authBearerMiddleware} from "../../middlewares/auth-bearer-middleware";
import {commentsController} from "../../application/composition-root/comments-composition";

export const commentsRouter = Router()

commentsRouter.get('/:id',
    commentsController.findCommentById.bind(commentsController))

commentsRouter.put('/:commentId',
    authBearerMiddleware,
    commentBodyValidation,
    errorsValidationResultMiddleware,
    commentsController.updateCommentController.bind(commentsController))

commentsRouter.delete('/:commentId',
    authBearerMiddleware,
    commentsController.deleteCommentController.bind(commentsController))

commentsRouter.put('/:commentId/like-status',
    authBearerMiddleware,
)