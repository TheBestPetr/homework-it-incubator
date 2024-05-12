import {Request, Response, NextFunction} from "express";
import {header} from "express-validator";

export const authBearerMiddleware = (req: Request,
                                     res: Response,
                                     next: NextFunction) => {
    const bearerHeader = req.headers['authorization'] as string
    if (!bearerHeader) {
        res.sendStatus(401)
        return
    }
    const bearer = bearerHeader.split(' ')
    if (bearer[0] !== 'Bearer' || bearer.length > 3) {
        res.sendStatus(401)
        return
    }
    header('authorization')
        .custom(value => {
            const token = value.split(' ')[1]
            if (token.not().isJWT()) {
                return 401
            }
            return true
        })
    req.headers.authorization = bearer[1]
    next()
}