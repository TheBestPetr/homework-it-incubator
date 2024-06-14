import mongoose from "mongoose";
import {RefreshTokenBlacklistDbType} from "../../../types/application-db-types/tokens-type";

export const refreshTokenBlacklistSchema = new mongoose.Schema<RefreshTokenBlacklistDbType>({
    token: {type: String, required: true}
})