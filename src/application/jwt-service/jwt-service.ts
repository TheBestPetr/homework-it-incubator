import jwt from 'jsonwebtoken'
import {SETTINGS} from "../../settings";

export const jwtService = {
    async createAccessToken(userId: string) {
        return jwt.sign({userId: userId}, SETTINGS.JWT_SECRET, {expiresIn: '1m'})
    },

    async createRefreshToken(userId: string) {
        return jwt.sign({userId: userId}, SETTINGS.JWT_SECRET, {expiresIn: '5m'})
    },

    async getUserIdByToken(userJWT: string) {
        try {
            const result: any = jwt.verify(userJWT, SETTINGS.JWT_SECRET)
            return result.userId.toString()
        } catch (e) {
            return null
        }
    }
}