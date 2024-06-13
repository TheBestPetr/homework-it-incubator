import mongoose from "mongoose";
import {EmailConfirmationType, PasswordRecoveryType, UserDbType} from "../../../types/db-types/user-db-type";

export const passwordRecoverySchema = new mongoose.Schema<PasswordRecoveryType>({
    recoveryCode: {type: String, default: undefined},
    expirationDate: {type: String, default: undefined}
}, {_id: false})

export const emailConfirmationSchema = new mongoose.Schema<EmailConfirmationType>({
    confirmationCode: {type: String, required: false},
    expirationDate: {type: String, required: false},
    isConfirmed: {type: Boolean, required: true}
}, {_id: false})

export const userSchema = new mongoose.Schema<UserDbType>({
    login: {type: String, required: true},
    passwordHash: {type: String, required: true},
    passwordRecovery: {type: passwordRecoverySchema, default: undefined},
    email: {type: String, required: true},
    createdAt: {type: String, required: true},
    emailConfirmation: {type: emailConfirmationSchema, required: true}
})