import jwt from 'jsonwebtoken'
import {SETTINGS} from "../../settings";

export const jwtService = {
    async createAccessJWTToken(userId: string) {
        return jwt.sign({userId: userId}, SETTINGS.JWT_SECRET, {expiresIn: '10s'})
    },

    async createRefreshJWTToken(userId: string) {
        return jwt.sign({userId: userId}, SETTINGS.JWT_SECRET, {expiresIn: '20s'})
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, SETTINGS.JWT_SECRET)
            return result.userId.toString()
        } catch (e) {
            return null
        }
    }
}