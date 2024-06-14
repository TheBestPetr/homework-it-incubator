import {RefreshTokenBlacklistModel} from "../../db/mongo/mongo-db";

export class RefreshTokenMongoRepository {
    async addTokenInBlacklist(token: string) {
        await RefreshTokenBlacklistModel.create({token: token})
    }

    async isTokenInBlacklist(token: string) {
        return RefreshTokenBlacklistModel.findOne({token: token}).lean()
    }
}