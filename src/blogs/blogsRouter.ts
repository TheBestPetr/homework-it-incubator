import {Router} from "express";
import {GetBlogsController} from "./getBlogsController";
import {CreateBlogController} from "./createBlogController";
import {FindBlogController} from "./findBlogController";
import {UpdateBlogController} from "./updateBlogController";
import {DeleteBlogController} from "./deleteBlogController";

export const blogsRouter = Router()

blogsRouter.get('/', GetBlogsController)
blogsRouter.post('/', CreateBlogController)
blogsRouter.get('/:id', FindBlogController)
blogsRouter.put('/:id', UpdateBlogController)
blogsRouter.delete('/:id', DeleteBlogController)