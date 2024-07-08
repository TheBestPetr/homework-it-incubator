import {LikeStatus} from "../input-output-types/comment-type";

export type PasswordRecoveryType = {
    recoveryCode?: string
    expirationDate?: string
}

export type EmailConfirmationType = {
    confirmationCode?: string
    expirationDate?: string
    isConfirmed: boolean
}

export type postLikeInfoType = Array<{
    postId: string
    LikeStatus: LikeStatus
}> | undefined

export type UserDbType = {
    login: string
    passwordHash: string
    passwordRecovery?: PasswordRecoveryType
    email: string
    createdAt: string
    emailConfirmation: EmailConfirmationType
    postLikeInfo?: postLikeInfoType
}