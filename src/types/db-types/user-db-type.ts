export type PasswordRecoveryType = {
    recoveryCode?: string
    expirationDate?: string
}

export type EmailConfirmationType = {
    confirmationCode?: string
    expirationDate?: string
    isConfirmed: boolean
}

export type UserDbType = {
    login: string
    passwordHash: string
    passwordRecovery?: PasswordRecoveryType
    email: string
    createdAt: string
    emailConfirmation: EmailConfirmationType
}