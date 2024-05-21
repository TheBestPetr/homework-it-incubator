import {Request, Response} from "express";
import {InputLoginType} from "../../types/input-output-types/auth-type";
import {authService} from "../03-servise/auth-service";
import {jwtService} from "../../application/jwt-service/jwt-service";
import {meDBType} from "../../types/db-types/me-db-type";
import {usersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";
import {InputUserType} from "../../types/input-output-types/user-type";
import {refreshTokenMongoRepository} from "../04-repository/refresh-token-mongo-repository";

export const loginUser = async (req: Request<{}, {}, InputLoginType>,
                                res: Response) => {
    const userId = await authService.checkCredentials(req.body)
    if (userId) {
        const accessToken = await jwtService.createAccessToken(userId)
        const refreshToken = await jwtService.createRefreshToken(userId)
        res.cookie('token', refreshToken, {httpOnly: true, secure: true})
        res.status(200).send({'accessToken': accessToken})
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

export const userRegistrationConfirmation = async (req: Request<{}, {}, { 'code': string }>,
                                                   res: Response) => {
    const isUserVerified = await authService.confirmUserEmail(req.body.code)
    if (isUserVerified) {
        res.sendStatus(204)
        return
    }
    res.sendStatus(400)
}

export const userRegistrationEmailResending = async (req: Request<{}, {}, { 'email': string }>,
                                                     res: Response) => {
    const isUserVerified = await authService.confirmUserEmailResending(req.body.email)
    if (isUserVerified) {
        res.sendStatus(204)
        return
    }
    res.sendStatus(400)
}

export const createNewTokensController = async (req: Request,
                                            res: Response) => {
    const isTokenOk = await refreshTokenMongoRepository.isTokenInBlacklist(req.cookies.token)
    if (isTokenOk) {
        res.sendStatus(401)
        return
    }
    const newTokens = await authService.createNewTokens(req.cookies.token)
    if (!newTokens) {
        res.sendStatus(401)
        return
    }
    res.cookie('token', newTokens.refreshToken, {httpOnly: true, secure: true})
    res.status(200).send({'accessToken': newTokens.accessToken})
}

export const userLogout = async (req: Request,
                                 res: Response) => {
    const userId = await jwtService.getUserIdByToken(req.cookies.token)
    const token = req.cookies.token
    const isTokenValid = await refreshTokenMongoRepository.isTokenInBlacklist(token)
    console.log(isTokenValid)
    if (userId || !isTokenValid) {
        const result = await refreshTokenMongoRepository.addTokenInBlacklist(token)
        console.log(result)
        res.sendStatus(204)
        return
    }
    res.sendStatus(401)

}