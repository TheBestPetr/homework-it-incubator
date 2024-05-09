import jwt from 'jsonwebtoken'
import {SETTINGS} from "../../settings";
import {ObjectId} from "mongodb";

export const jwtService = {
    async createJWT(userId: string) {
        return jwt.sign({userId: userId}, SETTINGS.JWT_SECRET, {expiresIn: '1d'})
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