import {DeviceDBType} from "../../types/db-types/device-db-type";
import {DeviceModel} from "../../db/mongo/mongo-db";
import {OutputDeviceType} from "../../types/input-output-types/device-type";
import {RefreshTokenMongoRepository} from "../../05-auth/04-repository/refresh-token-mongo-repository";
import {JwtService} from "../../application/jwt-service/jwt-service";

export class DevicesMongoRepository {
    private refreshTokenMongoRepository: RefreshTokenMongoRepository
    private jwtService: JwtService

    constructor() {
        this.refreshTokenMongoRepository = new RefreshTokenMongoRepository()
        this.jwtService = new JwtService()
    }

    async create(input: DeviceDBType): Promise<boolean> {
        const result = await DeviceModel.create(input)
        return !!result
    }

    async updateIatNExp(deviceId: string, oldIat: string, iat: string, exp: string): Promise<boolean> {
        const result = await DeviceModel.updateOne({deviceId: deviceId, iat: oldIat}, {$set: {iat: iat, exp: exp}})
        return !!result.matchedCount
    }

    async deleteSessionByDeviceId(deviceId: string): Promise<boolean> {
        const result = await DeviceModel.deleteOne({deviceId: deviceId})
        return !!result
    }

    async deleteAllSessions(deviceId: string): Promise<boolean> {
        const result = await DeviceModel.deleteMany({deviceId: {$nin: [deviceId]}})
        return !!result
    }

    async findActiveSessions(refreshToken: string): Promise<OutputDeviceType[] | null> {
        const isTokenInBlackList = await this.refreshTokenMongoRepository.isTokenInBlacklist(refreshToken)
        const userId = this.jwtService.getUserIdByToken(refreshToken)
        const activeSessions = await DeviceModel.find({userId: userId}).lean()
        if (!userId || !activeSessions || isTokenInBlackList) {
            return null
        }
        return activeSessions.map(device => ({
            ip: device.ip,
            title: device.deviceName,
            lastActiveDate: device.iat,
            deviceId: device.deviceId
        }))
    }

    async findSessionByDeviceId(deviceId: string): Promise<string | null> {
        const session = await DeviceModel.findOne({deviceId: deviceId}).lean()
        if (session) {
            return session.userId
        }
        return null
    }
}