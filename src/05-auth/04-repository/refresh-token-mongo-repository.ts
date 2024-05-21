import {refreshTokenBlacklistCollection} from "../../db/mongo-db";
import {RefreshTokenBlacklistDbType} from "../../types/db-types/refresh-token-blacklist-db-type";

export const refreshTokenMongoRepository = {
    async addTokenInBlacklist(token: string) {
        await refreshTokenBlacklistCollection.insertOne({token: token})
    },

    async isTokenInBlacklist(token: string) {
        return await refreshTokenBlacklistCollection.findOne({token: token})
    }
}