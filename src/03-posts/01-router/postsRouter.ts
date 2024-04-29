import {Router} from "express"
import {
    createPostController,
    deletePostController,
    findPostController,
    getPosts,
    updatePostController
} from "../02-controllers/postsController";
import {authMiddleware} from "../../middlewares/authMiddleware";
import {errorsValidationResultMiddleware} from "../../middlewares/errorsValidationMiddleware";
import {postBodyValidation} from "../../middlewares/postsValidationMiddleware";

export const postsRouter = Router()

postsRouter.get('/',
    getPosts)
postsRouter.post('/',
    authMiddleware,
    postBodyValidation,
    errorsValidationResultMiddleware,
    createPostController)
postsRouter.get('/:id',
    findPostController)
postsRouter.put('/:id',
    authMiddleware,
    postBodyValidation,
    errorsValidationResultMiddleware,
    updatePostController)
postsRouter.delete('/:id',
    authMiddleware,
    deletePostController)