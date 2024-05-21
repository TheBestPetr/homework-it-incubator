import {InputLoginType} from "../../types/input-output-types/auth-type";
import {bcryptService} from "../../application/bcrypt-service/bcrypt-service";
import {usersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";
import {InputUserType} from "../../types/input-output-types/user-type";
import {UserDbType} from "../../types/db-types/user-db-type";
import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";
import {usersMongoRepository} from "../../04-users/04-repository/users-mongo-repository";
import {nodemailerService} from "../../application/nodemaile-service/nodemailer-service";
import {jwtService} from "../../application/jwt-service/jwt-service";
import {refreshTokenMongoRepository} from "../04-repository/refresh-token-mongo-repository";
import {TokensType} from "../../types/applicationTypes/token-type";

export const authService = {
    async checkCredentials(input: InputLoginType): Promise<string | null> {
        const user = await usersMongoQueryRepository.findByLoginOrEmail(input.loginOrEmail)
        if (user) {
            const isPassCorrect = await bcryptService.checkPassword(input.password, user!.passwordHash)
            if (isPassCorrect) {
                return user._id.toString()
            }
        }
        return null
    },

    async registerUser(input: InputUserType): Promise<boolean> {
        const passwordHash = await bcryptService.generateHash(input.password)
        const createdUser: UserDbType = {
            login: input.login,
            passwordHash: passwordHash,
            email: input.email,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 2
                }).toISOString(),
                isConfirmed: false
            }
        }
        await usersMongoRepository.create(createdUser)

        nodemailerService.sendEmail(createdUser.email, 'User registration code', createdUser.emailConfirmation!.confirmationCode!)
            .catch((error) => {
                console.error('Send email error', error)
            })
        return true
    },

    async confirmUserEmail(confirmationCode: string): Promise<boolean> {
        const user = await usersMongoQueryRepository.findByConfirmationCode(confirmationCode)
        if (user) {
            user.emailConfirmation.confirmationCode = undefined
            user.emailConfirmation.expirationDate = undefined
            user.emailConfirmation.isConfirmed = true
            const result = await usersMongoRepository.updateEmailConfirmation(user._id.toString(), user)
            return result.modifiedCount === 1
        }
        return false
    },

    async confirmUserEmailResending(email: string): Promise<boolean> {
        const user = await usersMongoQueryRepository.findByLoginOrEmail(email)
        if (user) {
            user.emailConfirmation.confirmationCode = randomUUID()
            user.emailConfirmation.expirationDate = add(new Date(), {
                hours: 1,
                minutes: 2
            }).toISOString()
            const result = await usersMongoRepository.updateEmailConfirmation(user._id.toString(), user)
            if (result) {
                nodemailerService.sendEmail(user.email, 'User registration new code', user.emailConfirmation!.confirmationCode)
                    .catch((error) => {
                        console.error(error)
                    })
            }
            return true
        }
        return false
    },

    async createNewTokens(refreshToken: string): Promise<TokensType | null> {
        const isTokenInBlacklist = await refreshTokenMongoRepository.isTokenInBlacklist(refreshToken)
        const userId = await jwtService.getUserIdByToken(refreshToken)
        if (!userId || isTokenInBlacklist) {
            return null
        }
        await refreshTokenMongoRepository.addTokenInBlacklist(refreshToken)
        return {
            accessToken: await jwtService.createAccessJWTToken(userId),
            refreshToken: await jwtService.createRefreshJWTToken(userId)
        }
    },

    async logoutUser(refreshToken: string): Promise<boolean> {
        const userId = await jwtService.getUserIdByToken(refreshToken)
        const isTokenInBlacklist = await refreshTokenMongoRepository.isTokenInBlacklist(refreshToken)
        if (!userId || isTokenInBlacklist) {
            return false
        }
        await refreshTokenMongoRepository.addTokenInBlacklist(refreshToken)
        return true
    }
}