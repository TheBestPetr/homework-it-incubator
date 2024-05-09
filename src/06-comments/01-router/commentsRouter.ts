import {Router} from "express";
import {deleteCommentController, getCommentById, updateCommentController} from "../02-controllers/commentsController";
import {commentBodyValidation} from "../../validators/commentsValidator";
import {errorsValidationResultMiddleware} from "../../validators/errorsValidationMiddleware";
import {authBearerMiddleware} from "../../middlewares/authBearerMiddleware";

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