import {Request, Response} from "express";
import {InputLoginType} from "../../types/authType";
import {authService} from "../03-servise/authService";
import {jwtService} from "../../application/jwtService/jwtService";
import {meDBType} from "../../db/me-db-type";
import {usersMongoQueryRepository} from "../../04-users/04-repository/usersMongoQueryRepository";
import {InputUserType} from "../../types/userType";

export const loginUser = async (req: Request<{}, {}, InputLoginType>,
                                res: Response) => {
    const user = await authService.checkCredentials(req.body)
    if (user) {
        const token = await jwtService.createJWT(user)
        res.status(200).send({'accessToken': token})
        return
    }
    res.sendStatus(401)
}

export const getUserInfo = async (req: Request,
                                  res: Response<meDBType | {}>) => {
    const userId = await jwtService.getUserIdByToken(req.headers.authorization!)
    if (userId) {
        const user = await usersMongoQueryRepository.findById(userId)
        if (user) {
            res.status(200).send(user)
            return
        }
    }
    res.sendStatus(404)
}

export const userRegistration = async (req: Request<{}, {}, InputUserType>,
                                       res: Response) => {
    const newUser = await authService.registerUser(req.body)
    if (!newUser) {
        res.sendStatus(400)
        return
    }
    res.sendStatus(204)
}

export const userRegistrationConfirmation = async (req: Request<{}, {}, {'code': string}>,
                                                   res: Response) => {
    const isUserVerified = await authService.confirmUserEmail(req.body.code)
    if (isUserVerified) {
        res.sendStatus(204)
        return
    }
    res.sendStatus(400)
}

export const userRegistrationEmailResending = async (req: Request<{}, {}, {'email': string}>,
                                                     res: Response) => {
    const isUserVerified = await authService.confirmUserEmailResending(req.body.email)
    if (isUserVerified) {
        res.sendStatus(204)
        return
    }
    res.sendStatus(400)
}