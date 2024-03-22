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
//import {errorsValidationResultMiddleware} from "../middlewares/errorsValidationMiddleware";

export const postsRouter = Router()

postsRouter.get('/', GetPostsController)
postsRouter.post('/', authMiddleware, postTitleValidator, postShortDescriptionValidator, postContentValidator, /*postBlogIdValidator, errorsValidationResultMiddleware,*/ CreatePostController)
postsRouter.get('/:id', FindPostController)
postsRouter.put('/:id', authMiddleware, postTitleValidator, postShortDescriptionValidator, postContentValidator, /*postBlogIdValidator, errorsValidationResultMiddleware,*/ UpdatePostController)
postsRouter.delete('/:id', authMiddleware, DeletePostController)