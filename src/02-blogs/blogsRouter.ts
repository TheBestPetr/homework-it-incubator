import {Router} from "express";
import {GetBlogsController} from "./getBlogsController";
import {CreateBlogController} from "./createBlogController";
import {FindBlogController} from "./findBlogController";
import {UpdateBlogController} from "./updateBlogController";
import {DeleteBlogController} from "./deleteBlogController";
import {blogDescriptionValidator, blogNameValidator, blogWebsiteUrlValidator} from "../middlewares/blogsValidationMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";
import {errorsValidationResultMiddleware} from "../middlewares/errorsValidationMiddleware";

export const blogsRouter = Router()

blogsRouter.get('/', GetBlogsController)
blogsRouter.post('/', authMiddleware, blogNameValidator, blogDescriptionValidator, blogWebsiteUrlValidator, errorsValidationResultMiddleware, CreateBlogController)
blogsRouter.get('/:id', FindBlogController)
blogsRouter.put('/:id', authMiddleware, blogNameValidator, blogDescriptionValidator, blogWebsiteUrlValidator, errorsValidationResultMiddleware, UpdateBlogController)
blogsRouter.delete('/:id', authMiddleware, DeleteBlogController)