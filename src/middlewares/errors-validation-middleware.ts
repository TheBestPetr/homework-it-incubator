import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const errorsValidationResultMiddleware = (req: Request,
                                                 res: Response,
                                                 next: NextFunction) => {
    const errors: any = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send({
            errorsMessages: errors.array({onlyFirstError: true}).map((item: any) => ({
                message: item.msg,
                field: item.path
            }))
        })
    } else {
        next()
    }
}