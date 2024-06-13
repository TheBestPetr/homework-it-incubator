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
import {TokensType} from "../../types/applicationTypes/tokens-type";
import {devicesService} from "../../07-security/03-service/devices-service";
import {DeviceDBType} from "../../types/db-types/device-db-type";
import {devicesMongoRepository} from "../../07-security/04-repository/devices-mongo-repository";
import {devicesMongoQueryRepository} from "../../07-security/04-repository/devices-mongo-query-repository";

export const authService = {
    async checkCredentials(input: InputLoginType): Promise<string | null> {
        const user = await usersMongoQueryRepository.findByLoginOrEmail(input.loginOrEmail)
        if (user) {
            const isPassCorrect = await bcryptService.checkPassword(input.password, user.passwordHash)
            if (isPassCorrect) {
                return user._id.toString()
            }
        }
        return null
    },

    async loginUser(userId: string, ip: string, deviceName: string): Promise<TokensType> {
        const newDeviceId = randomUUID().toString()
        const accessToken = await jwtService.createAccessJWTToken(userId)
        const refreshToken = await jwtService.createRefreshJWTToken(userId, newDeviceId)
        const iatNExp = await jwtService.getTokenIatNExp(refreshToken)
        const newDevice: DeviceDBType = {
            userId: userId,
            deviceId: newDeviceId,
            iat: new Date(iatNExp!.iat * 1000).toISOString(),
            deviceName: deviceName,
            ip: ip,
            exp: new Date(iatNExp!.exp * 1000).toISOString()
        }
        await devicesService.addDevice(newDevice)
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
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

        nodemailerService.sendRegistrationEmail(createdUser.email, 'User registration code', createdUser.emailConfirmation!.confirmationCode!)
            .catch((error) => {
                console.error('Send email error', error)
            })
        return true
    },

    async confirmUserEmail(confirmationCode: string): Promise<boolean> {
        const user = await usersMongoQueryRepository.findByEmailConfirmationCode(confirmationCode)
        if (user) {
            user.emailConfirmation.confirmationCode = undefined
            user.emailConfirmation.expirationDate = undefined
            user.emailConfirmation.isConfirmed = true
            const result = await usersMongoRepository.updateEmailConfirmation(user._id.toString(), user)
            return result.matchedCount === 1
        }
        return false
    },

    async confirmUserEmailResending(email: string): Promise<boolean> {
        const user = await usersMongoQueryRepository.findByLoginOrEmail(email)
        if (user) {
            user.emailConfirmation.confirmationCode = randomUUID()
            user.emailConfirmation.expirationDate = add(new Date(), {
                hours: 1,
                minutes: 1
            }).toISOString()
            const result = await usersMongoRepository.updateEmailConfirmation(user._id.toString(), user)
            if (result) {
                nodemailerService.sendRegistrationEmail(user.email, 'User registration new code', user.emailConfirmation!.confirmationCode)
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
        const deviceId = await jwtService.getDeviceIdByToken(refreshToken)
        const oldIat = await jwtService.getTokenIatNExp(refreshToken)
        const isDeviceExist = await devicesMongoQueryRepository.findSessionByDeviceId(deviceId)
        if (!userId || isTokenInBlacklist || !isDeviceExist) {
            return null
        }
        await refreshTokenMongoRepository.addTokenInBlacklist(refreshToken)
        const newAccessToken = await jwtService.createAccessJWTToken(userId)
        const newRefreshToken = await jwtService.createRefreshJWTToken(userId, deviceId)
        const iatNExp = await jwtService.getTokenIatNExp(newRefreshToken)
        await devicesService.updateDeviceIatNExp(deviceId, new Date(oldIat!.iat * 1000).toISOString(), new Date(iatNExp!.iat * 1000).toISOString(), new Date(iatNExp!.exp * 1000).toISOString())
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }
    },

    async logoutUser(refreshToken: string): Promise<boolean> {
        const userId = await jwtService.getUserIdByToken(refreshToken)
        const isTokenInBlacklist = await refreshTokenMongoRepository.isTokenInBlacklist(refreshToken)
        const deviceId = await jwtService.getDeviceIdByToken(refreshToken)
        const isDeviceExist = await devicesMongoQueryRepository.findSessionByDeviceId(deviceId)
        if (!userId || isTokenInBlacklist || !isDeviceExist) {
            return false
        }
        await devicesMongoRepository.deleteSessionByDeviceId(deviceId)
        await refreshTokenMongoRepository.addTokenInBlacklist(refreshToken)
        return true
    },

    async passwordRecovery(email: string): Promise<boolean> {
        const user = await usersMongoQueryRepository.findByLoginOrEmail(email)
        if (user) {
            user.passwordRecovery = {
                recoveryCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 1
                }).toISOString()
            }
            const result = await usersMongoRepository.passwordRecoveryConfirmation(email, user)
            if (result) {
                nodemailerService.sendPasswordRecoveryEmail(email, 'password recovery code', user.passwordRecovery.recoveryCode!)
                    .catch((error) => {
                        console.error(error)
                    })
                return true
            }
        }
        return false
    },

    async newPasswordConfirmation(password: string, recoveryCode: string): Promise<boolean> {
        const user = await usersMongoQueryRepository.findByPasswordRecoveryCode(recoveryCode)
        if (user) {
            user.passwordRecovery!.recoveryCode = undefined
            user.passwordRecovery!.expirationDate = undefined
            const newPasswordHash = await bcryptService.generateHash(password)
            const result = await usersMongoRepository.updatePasswordRecovery(user._id.toString(), newPasswordHash, user)
            return result.matchedCount === 1
        }
        return false
    }
}