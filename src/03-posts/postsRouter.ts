import {Router} from "express"
import {
    createPostController,
    deletePostController,
    findPostController,
    getPostsController,
    updatePostController
} from "./controllers/postsController";
import {
    postBlogIdValidator,
    postContentValidator,
    postShortDescriptionValidator,
    postTitleValidator
} from "../middlewares/postsValidationMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";
import {errorsValidationResultMiddleware} from "../middlewares/errorsValidationMiddleware";

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.post('/', authMiddleware, postTitleValidator, postShortDescriptionValidator, postContentValidator, postBlogIdValidator, errorsValidationResultMiddleware, createPostController)
postsRouter.get('/:id', findPostController)
postsRouter.put('/:id', authMiddleware, postTitleValidator, postShortDescriptionValidator, postContentValidator, postBlogIdValidator, errorsValidationResultMiddleware, updatePostController)
postsRouter.delete('/:id', authMiddleware, deletePostController)