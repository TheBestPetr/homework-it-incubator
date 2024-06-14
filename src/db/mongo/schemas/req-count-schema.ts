import mongoose from "mongoose";
import {ReqCountDbType} from "../../../types/application-db-types/req-db-type";

export const reqCountSchema = new mongoose.Schema<ReqCountDbType>({
    ip: {type: String, required: true},
    URL: {type: String, required: true},
    date: {type: Date, required: true},
})