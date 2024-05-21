import {Request, Response, NextFunction} from "express";
import {jwtService} from "../application/jwt-service/jwt-service";

export const authBearerMiddleware = (req: Request,
                                     res: Response,
                                     next: NextFunction) => {
    const bearerHeader = req.headers['authorization'] as string
    if (!bearerHeader) {
        res.sendStatus(401)
        return
    }
    const bearer = bearerHeader.split(' ')
    const userId = jwtService.getUserIdByToken(bearer[1])
    const splitBearer = bearer[1].split('.')
    if (bearer[0] !== 'Bearer' || bearer.length > 3 || !userId || splitBearer.length !== 3) {
        res.sendStatus(401)
        return
    }
    req.headers.authorization = bearer[1]
    next()
}