export type UserDbType = {
    login: string
    passwordHash: string
    passwordRecovery?: {
        recoveryCode?: string
        expirationDate?: string
    }
    email: string
    createdAt: string
    emailConfirmation: {
        confirmationCode?: string
        expirationDate?: string
        isConfirmed: boolean
    }

}