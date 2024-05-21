import {Router} from "express";
import {deleteCommentController, getCommentById, updateCommentController} from "../02-controllers/comments-controller";
import {commentBodyValidation} from "../../validators/comments-validator";
import {errorsValidationResultMiddleware} from "../../middlewares/errors-validation-middleware";
import {authBearerMiddleware} from "../../middlewares/auth-bearer-middleware";

export const commentsRouter = Router()

commentsRouter.get('/:id',
    getCommentById)

commentsRouter.put('/:commentId',
    authBearerMiddleware,
    commentBodyValidation,
    errorsValidationResultMiddleware,
    updateCommentController)

commentsRouter.delete('/:commentId',
    authBearerMiddleware,
    deleteCommentController)