import {DeviceDBType} from "../../types/db-types/device-db-type";
import {DevicesMongoRepository} from "../04-repository/devices-mongo-repository";
import {JwtService} from "../../application/jwt-service/jwt-service";

export class DevicesService {
    constructor(
        protected devicesMongoRepository: DevicesMongoRepository,
        protected jwtService: JwtService
    ) {}

    async createDevice(input: DeviceDBType): Promise<boolean> {
        return await this.devicesMongoRepository.create(input)
    }

    async updateDeviceIatNExp(deviceId: string, oldIat: string, iat: string, exp: string): Promise<boolean> {
        return await this.devicesMongoRepository.updateIatNExp(deviceId, oldIat, iat, exp)
    }

    async findSessionToTerminate(deviceId: string): Promise<string | null> {
        return await this.devicesMongoRepository.findSessionByDeviceId(deviceId)

    }

    async isUserCanTerminateSession(refreshToken: string, deviceId: string): Promise<boolean> {
        const userId = await this.jwtService.getUserIdByToken(refreshToken)
        const isSessionBelongsToUser = await this.devicesMongoRepository.findSessionByDeviceId(deviceId)
        if (userId !== isSessionBelongsToUser) {
            return false
        }
        return await this.devicesMongoRepository.deleteSessionByDeviceId(deviceId)
    }

    async terminateAllSessions(refreshToken: string): Promise<boolean> {
        const deviceId = await this.jwtService.getDeviceIdByToken(refreshToken)
        return await this.devicesMongoRepository.deleteAllSessions(deviceId)
    }
}