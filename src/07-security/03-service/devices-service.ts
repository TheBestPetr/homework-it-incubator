import {DeviceDBType} from "../../types/db-types/device-db-type";
import {devicesMongoRepository} from "../04-repository/devices-mongo-repository";
import {jwtService} from "../../application/jwt-service/jwt-service";
import {devicesMongoQueryRepository} from "../04-repository/devices-mongo-query-repository";

export const devicesService = {
    async addDevice(input: DeviceDBType): Promise<boolean> {
        return await devicesMongoRepository.create(input)
    },

    async updateDeviceIatNExp(deviceId: string, oldIat: string, iat: string, exp: string): Promise<boolean> {
        return await devicesMongoRepository.updateIatNExp(deviceId, oldIat, iat, exp)
    },

    async findSessionToTerminate(deviceId: string): Promise<string | null> {
        return await devicesMongoQueryRepository.findSessionByDeviceId(deviceId)

    },

    async isUserCanTerminateSession(refreshToken: string, deviceId: string): Promise<boolean> {
        const userId = await jwtService.getUserIdByToken(refreshToken)
        const isSessionBelongsToUser = await devicesMongoQueryRepository.findSessionByDeviceId(deviceId)
        if (userId !== isSessionBelongsToUser) {
            return false
        }
        return await devicesMongoRepository.deleteSessionByDeviceId(deviceId)
    },

    async terminateAllSessions(refreshToken: string): Promise<boolean> {
        const deviceId = await jwtService.getDeviceIdByToken(refreshToken)
        return await devicesMongoRepository.deleteAllSessions(deviceId)
    }
}