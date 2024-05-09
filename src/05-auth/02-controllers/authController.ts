import {Request, Response} from "express";
import {InputLoginType} from "../../types/authType";
import {authService} from "../03-servise/authService";
import {jwtService} from "../../application/jwtService/jwtService";
import {meDBType} from "../../db/me-db-type";
import {usersMongoQueryRepository} from "../../04-users/04-repository/usersMongoQueryRepository";

export const loginUser = async (req: Request<{}, {}, InputLoginType>,
                                res: Response) => {
    const user = await authService.checkCredentials(req.body)
    if (user) {
        const token = await jwtService.createJWT(user)
        res.status(200).send(token)
    }
    res.sendStatus(401)
}

export const getUserInfo = async (req: Request,
                                  res: Response<meDBType | {}>) => {
    const userId = await jwtService.getUserIdByToken(req.headers.authorization!)
    if (userId) {
        const user = await usersMongoQueryRepository.findWithId(userId)
        if (user) {
            res.status(200).send(user)
            return
        }
    }
    res.sendStatus(404)
}