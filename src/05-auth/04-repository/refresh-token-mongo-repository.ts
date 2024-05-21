import {refreshTokenBlacklistCollection} from "../../db/mongo-db";

export const refreshTokenMongoRepository = {
    async addTokenInBlacklist(token: string) {
        await refreshTokenBlacklistCollection.insertOne({token: token})
    },

    async isTokenInBlacklist(token: string) {
        return await refreshTokenBlacklistCollection.findOne({token: token})
    }
}