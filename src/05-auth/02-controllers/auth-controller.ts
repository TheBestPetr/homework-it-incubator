import {Request, Response} from "express";
import {InputLoginType} from "../../types/input-output-types/auth-type";
import {AuthService} from "../03-servise/auth-service";
import {UsersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";
import {InputUserType, OutputIType} from "../../types/input-output-types/user-type";

export class AuthController {
    constructor(
        protected authService: AuthService,
        protected usersMongoQueryRepository: UsersMongoQueryRepository,
    ) {}

    async loginUser(req: Request<{}, {}, InputLoginType>,
                    res: Response) {
        const userId = await this.authService.checkCredentials(req.body)
        if (userId) {
            const tokens = await this.authService.loginUser(userId, req.ip!, req.headers['user-agent']!)
            res.cookie('refreshToken', tokens?.refreshToken, {httpOnly: true, secure: true})
            res.status(200).send({'accessToken': tokens.accessToken})
            return
        }
        res.sendStatus(401)
    }

    async getUserInfo(req: Request,
                      res: Response<OutputIType | {}>) {
        const userId = req.headers.authorization
        if (userId) {
            const user = await this.usersMongoQueryRepository.findById(userId)
            if (user) {
                res.status(200).send(user)
                return
            }
        }
        res.sendStatus(401)
    }

    async userRegistration(req: Request<{}, {}, InputUserType>,
                           res: Response) {
        const newUser = await this.authService.registerUser(req.body)
        if (!newUser) {
            res.sendStatus(400)
            return
        }
        res.sendStatus(204)
    }

    async userRegistrationConfirmation(req: Request<{}, {}, { 'code': string }>,
                                       res: Response) {
        const isUserVerified = await this.authService.confirmUserEmail(req.body.code)
        if (isUserVerified) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(400)
    }

    async userRegistrationEmailResending(req: Request<{}, {}, { 'email': string }>,
                                         res: Response) {
        const isUserVerified = await this.authService.confirmUserEmailResending(req.body.email)
        if (isUserVerified) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(400)
    }

    async createNewTokensController(req: Request,
                                    res: Response) {
        const newTokens = await this.authService.createNewTokens(req.cookies.refreshToken)
        if (!newTokens) {
            res.sendStatus(401)
            return
        }
        res.cookie('refreshToken', newTokens.refreshToken, {httpOnly: true, secure: true})
        res.status(200).send({'accessToken': newTokens.accessToken})
    }

    async userLogout(req: Request,
                     res: Response) {
        const isUserLogout = await this.authService.logoutUser(req.cookies.refreshToken)
        if (isUserLogout) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(401)
        return
    }

    async passwordRecovery(req: Request<{}, {}, { email: string }>,
                           res: Response) {
        const isEmailSend = await this.authService.passwordRecovery(req.body.email)
        if (!isEmailSend) {
            console.log('Email not be sand')
            res.sendStatus(204)
            return
        }
        res.sendStatus(204)
    }

    async newPasswordConfirmation(req: Request<{}, {}, { newPassword: string, recoveryCode: string }>,
                                  res: Response) {
        const isNewPasswordConfirm = await this.authService.newPasswordConfirmation(req.body.newPassword, req.body.recoveryCode)
        if (!isNewPasswordConfirm) {
            res.sendStatus(400)
            return
        }
        res.sendStatus(204)
    }
}