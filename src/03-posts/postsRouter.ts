import {Router} from "express"
import {GetPostsController} from "./getPostsController";
import {CreatePostController} from "./createPostController";
import {FindPostController} from "./findPostController";
import {UpdatePostController} from "./updatePostController";
import {DeletePostController} from "./deletePostController";
import {
    //postBlogIdValidator,
    postContentValidator,
    postShortDescriptionValidator,
    postTitleValidator
} from "../middlewares/postsValidationMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";
import {validationResultMiddleware} from "../middlewares/errorsValidationMiddleware";

export const postsRouter = Router()

postsRouter.get('/', GetPostsController)
postsRouter.post('/', authMiddleware, postTitleValidator, postShortDescriptionValidator, postContentValidator, /*postBlogIdValidator,*/ validationResultMiddleware, CreatePostController)
postsRouter.get('/:id', FindPostController)
postsRouter.put('/:id', authMiddleware, postTitleValidator, postShortDescriptionValidator, postContentValidator, /*postBlogIdValidator,*/ validationResultMiddleware, UpdatePostController)
postsRouter.delete('/:id', authMiddleware, DeletePostController)