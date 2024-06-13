import mongoose from "mongoose";
import {DeviceDBType} from "../../../types/db-types/device-db-type";

export const deviceSchema = new mongoose.Schema<DeviceDBType>({
    userId: {type: String, required: true},
    deviceId: {type: String, required: true},
    iat: {type: String, required: true},
    deviceName: {type: String, required: true},
    ip: {type: String, required: true},
    exp: {type: String, required: true}
})