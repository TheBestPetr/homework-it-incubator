import {InputLoginType} from "../../types/input-output-types/auth-type";
import {BcryptService} from "../../application/bcrypt-service/bcrypt-service";
import {UsersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";
import {InputUserType} from "../../types/input-output-types/user-type";
import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";
import {UsersMongoRepository} from "../../04-users/04-repository/users-mongo-repository";
import {NodemailerService} from "../../application/nodemaile-service/nodemailer-service";
import {JwtService} from "../../application/jwt-service/jwt-service";
import {RefreshTokenMongoRepository} from "../04-repository/refresh-token-mongo-repository";
import {TokensType} from "../../types/application-db-types/tokens-type";
import {DevicesService} from "../../07-security/03-service/devices-service";
import {DevicesMongoRepository} from "../../07-security/04-repository/devices-mongo-repository";
import {DeviceClass} from "../../classes/device-class";
import {UserClass} from "../../classes/user-class";

export class AuthService {
    constructor(
        protected refreshTokenMongoRepository: RefreshTokenMongoRepository,
        protected usersMongoRepository: UsersMongoRepository,
        protected usersMongoQueryRepository: UsersMongoQueryRepository,
        protected devicesService: DevicesService,
        protected devicesMongoRepository: DevicesMongoRepository,
        protected bcryptService: BcryptService,
        protected jwtService: JwtService,
        protected nodemailerService: NodemailerService
    ) {}

    async checkCredentials(input: InputLoginType): Promise<string | null> {
        const user = await this.usersMongoQueryRepository.findByLoginOrEmail(input.loginOrEmail)
        if (user) {
            const isPassCorrect = await this.bcryptService.checkPassword(input.password, user.passwordHash)
            if (isPassCorrect) {
                return user._id.toString()
            }
        }
        return null
    }

    async loginUser(userId: string, ip: string, deviceName: string): Promise<TokensType> {
        const newDeviceId = randomUUID().toString()
        const accessToken = this.jwtService.createAccessJWTToken(userId)
        const refreshToken = this.jwtService.createRefreshJWTToken(userId, newDeviceId)
        const iatNExp = this.jwtService.getTokenIatNExp(refreshToken)
        const newDevice = new DeviceClass(
            userId,
            newDeviceId,
            new Date(iatNExp!.iat * 1000).toISOString(),
            deviceName,
            ip,
            new Date(iatNExp!.exp * 1000).toISOString()
        )
        await this.devicesService.createDevice(newDevice)
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    async registerUser(input: InputUserType): Promise<boolean> {
        const passwordHash = await this.bcryptService.generateHash(input.password)
        const expDate = add(new Date(), {
            hours: 1,
            minutes: 2
        }).toISOString()
        const createdUser = new UserClass(
            input.login,
            passwordHash,
            undefined,
            input.email,
            new Date().toISOString(),
            {confirmationCode: randomUUID(), expirationDate: expDate, isConfirmed: false}
        )
        await this.usersMongoRepository.create(createdUser)

        this.nodemailerService.sendRegistrationEmail(createdUser.email, 'User registration code', createdUser.emailConfirmation!.confirmationCode!)
            .catch((error) => {
                console.error('Send email error', error)
            })
        return true
    }

    async confirmUserEmail(confirmationCode: string): Promise<boolean> {
        const user = await this.usersMongoQueryRepository.findByEmailConfirmationCode(confirmationCode)
        if (user) {
            user.emailConfirmation.confirmationCode = undefined
            user.emailConfirmation.expirationDate = undefined
            user.emailConfirmation.isConfirmed = true
            const result = await this.usersMongoRepository.updateEmailConfirmation(user._id.toString(), user)
            return result.matchedCount === 1
        }
        return false
    }

    async confirmUserEmailResending(email: string): Promise<boolean> {
        const user = await this.usersMongoQueryRepository.findByLoginOrEmail(email)
        if (user) {
            user.emailConfirmation.confirmationCode = randomUUID()
            user.emailConfirmation.expirationDate = add(new Date(), {
                hours: 1,
                minutes: 1
            }).toISOString()
            const result = await this.usersMongoRepository.updateEmailConfirmation(user._id.toString(), user)
            if (result) {
                this.nodemailerService.sendRegistrationEmail(user.email, 'User registration new code', user.emailConfirmation!.confirmationCode)
                    .catch((error) => {
                        console.error(error)
                    })
            }
            return true
        }
        return false
    }

    async createNewTokens(refreshToken: string): Promise<TokensType | null> {
        const isTokenInBlacklist = await this.refreshTokenMongoRepository.isTokenInBlacklist(refreshToken)
        const userId = this.jwtService.getUserIdByToken(refreshToken)
        const deviceId = this.jwtService.getDeviceIdByToken(refreshToken)
        const oldIat = this.jwtService.getTokenIatNExp(refreshToken)
        const isDeviceExist = this.devicesMongoRepository.findSessionByDeviceId(deviceId)
        if (!userId || isTokenInBlacklist || !isDeviceExist) {
            return null
        }
        await this.refreshTokenMongoRepository.addTokenInBlacklist(refreshToken)
        const newAccessToken = this.jwtService.createAccessJWTToken(userId)
        const newRefreshToken = this.jwtService.createRefreshJWTToken(userId, deviceId)
        const iatNExp = this.jwtService.getTokenIatNExp(newRefreshToken)
        await this.devicesService.updateDeviceIatNExp(deviceId, new Date(oldIat!.iat * 1000).toISOString(), new Date(iatNExp!.iat * 1000).toISOString(), new Date(iatNExp!.exp * 1000).toISOString())
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }
    }

    async logoutUser(refreshToken: string): Promise<boolean> {
        const userId = this.jwtService.getUserIdByToken(refreshToken)
        const isTokenInBlacklist = await this.refreshTokenMongoRepository.isTokenInBlacklist(refreshToken)
        const deviceId = this.jwtService.getDeviceIdByToken(refreshToken)
        const isDeviceExist = await this.devicesMongoRepository.findSessionByDeviceId(deviceId)
        if (!userId || isTokenInBlacklist || !isDeviceExist) {
            return false
        }
        await this.devicesMongoRepository.deleteSessionByDeviceId(deviceId)
        await this.refreshTokenMongoRepository.addTokenInBlacklist(refreshToken)
        return true
    }

    async passwordRecovery(email: string): Promise<boolean> {
        const user = await this.usersMongoQueryRepository.findByLoginOrEmail(email)
        if (user) {
            user.passwordRecovery = {
                recoveryCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 1
                }).toISOString()
            }
            const result = await this.usersMongoRepository.passwordRecoveryConfirmation(email, user)
            if (result) {
                this.nodemailerService.sendPasswordRecoveryEmail(email, 'password recovery code', user.passwordRecovery.recoveryCode!)
                    .catch((error) => {
                        console.error(error)
                    })
                return true
            }
        }
        return false
    }

    async newPasswordConfirmation(password: string, recoveryCode: string): Promise<boolean> {
        const user = await this.usersMongoQueryRepository.findByPasswordRecoveryCode(recoveryCode)
        if (user) {
            user.passwordRecovery!.recoveryCode = undefined
            user.passwordRecovery!.expirationDate = undefined
            const newPasswordHash = await this.bcryptService.generateHash(password)
            const result = await this.usersMongoRepository.updatePasswordRecovery(user._id.toString(), newPasswordHash, user)
            return result.matchedCount === 1
        }
        return false
    }
}