import {Router} from "express"
import {GetPostsController} from "./getPostsController";
import {CreatePostController} from "./createPostController";
import {FindPostController} from "./findPostController";
import {UpdatePostController} from "./updatePostController";
import {DeletePostController} from "./deletePostController";

export const postsRouter = Router()

postsRouter.get('/', GetPostsController)
postsRouter.post('/', CreatePostController)
postsRouter.get('/:id', FindPostController)
postsRouter.put('/:id', UpdatePostController)
postsRouter.delete('/:id', DeletePostController)