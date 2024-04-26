import {Router} from "express";
import {
    createBlogController,
    deleteBlogController,
    findBlogController,
    getBlogsController,
    updateBlogController
} from "./controllers/blogsController";
import {
    blogDescriptionValidator,
    //blogIdValidator,
    blogNameValidator,
    blogWebsiteUrlValidator
} from "../middlewares/blogsValidationMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";
import {errorsValidationResultMiddleware} from "../middlewares/errorsValidationMiddleware";

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', authMiddleware, blogNameValidator, blogDescriptionValidator, blogWebsiteUrlValidator, errorsValidationResultMiddleware, createBlogController)
blogsRouter.get('/:id', /*blogIdValidator,*/ findBlogController)
blogsRouter.put('/:id', authMiddleware, /*blogIdValidator,*/ blogNameValidator, blogDescriptionValidator, blogWebsiteUrlValidator, errorsValidationResultMiddleware, updateBlogController)
blogsRouter.delete('/:id', authMiddleware, /*blogIdValidator,*/ deleteBlogController)