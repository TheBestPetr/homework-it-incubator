import {DeviceDBType} from "../../types/db-types/device-db-type";
import {deviceCollection} from "../../db/mongo-db";

export const devicesMongoRepository = {
    async create(input: DeviceDBType): Promise<boolean> {
        const result = await deviceCollection.insertOne(input)
        return !!result
    },

    async updateIatNExp(deviceId: string, oldIat: string, iat: string, exp: string ): Promise<boolean> {
        const result = await deviceCollection.updateOne({deviceId: deviceId, iat: oldIat}, {$set: {iat: iat, exp: exp}})
        return !!result.matchedCount
    },

    async deleteSessionByDeviceId(deviceId: string): Promise<boolean> {
        const result = await deviceCollection.deleteOne({deviceId: deviceId})
        return !!result
    },

    async deleteAllSessions(deviceId: string): Promise<boolean> {
        const result = await deviceCollection.deleteMany({deviceId: {$nin: [deviceId]}})
        return !!result
    }
}