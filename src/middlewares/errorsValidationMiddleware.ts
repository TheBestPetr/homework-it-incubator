import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const errorsValidationResultMiddleware = (req: Request,
                                                 res: Response,
                                                 next: NextFunction) => {
    const errors: any = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({
            errorsMessages: errors.array().map((item: any) => ({
                message: item.msg,
                field: item.path
            }))
        })
    } else {
        next()
    }
}