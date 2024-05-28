import {OutputDeviceType} from "../../types/input-output-types/device-type";
import {deviceCollection} from "../../db/mongo-db";
import {jwtService} from "../../application/jwt-service/jwt-service";

export const devicesMongoQueryRepository = {
    async findActiveSessions(refreshToken: string): Promise<OutputDeviceType[]> {
        const userId = await jwtService.getUserIdByToken(refreshToken)
        const activeSessions = await deviceCollection.find({userId: userId}).toArray()
        return activeSessions.map(device => ({
            ip: device.ip,
            title: device.deviceName,
            lastActiveDate: device.iat,
            deviceId: device.deviceId
        }))
    },

    async findSessionByDeviceId(deviceId: string): Promise<string | null> {
        const session = await deviceCollection.findOne({deviceId: deviceId})
        if (session) {
            return session.userId
        }
        return null
    }
}