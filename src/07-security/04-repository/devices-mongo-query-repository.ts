import {OutputDeviceType} from "../../types/input-output-types/device-type";
import {DeviceModel} from "../../db/mongo/mongo-db";
import {jwtService} from "../../application/jwt-service/jwt-service";
import {refreshTokenMongoRepository} from "../../05-auth/04-repository/refresh-token-mongo-repository";

export const devicesMongoQueryRepository = {
    async findActiveSessions(refreshToken: string): Promise<OutputDeviceType[] | null> {
        const isTokenInBlackList = await refreshTokenMongoRepository.isTokenInBlacklist(refreshToken)
        const userId = await jwtService.getUserIdByToken(refreshToken)
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
    },

    async findSessionByDeviceId(deviceId: string): Promise<string | null> {
        const session = await DeviceModel.findOne({deviceId: deviceId}).lean()
        if (session) {
            return session.userId
        }
        return null
    }
}