import {DeviceDBType} from "../../types/db-types/device-db-type";
import {DeviceModel} from "../../db/mongo/mongo-db";

export const devicesMongoRepository = {
    async create(input: DeviceDBType): Promise<boolean> {
        const result = await DeviceModel.create(input)
        return !!result
    },

    async updateIatNExp(deviceId: string, oldIat: string, iat: string, exp: string ): Promise<boolean> {
        const result = await DeviceModel.updateOne({deviceId: deviceId, iat: oldIat}, {$set: {iat: iat, exp: exp}})
        return !!result.matchedCount
    },

    async deleteSessionByDeviceId(deviceId: string): Promise<boolean> {
        const result = await DeviceModel.deleteOne({deviceId: deviceId})
        return !!result
    },

    async deleteAllSessions(deviceId: string): Promise<boolean> {
        const result = await DeviceModel.deleteMany({deviceId: {$nin: [deviceId]}})
        return !!result
    }
}