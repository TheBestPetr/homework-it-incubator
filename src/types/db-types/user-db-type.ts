export type UserDbType = {
    login: string
    passwordHash: string
    email: string
    createdAt: string
    emailConfirmation: {
        confirmationCode?: string
        expirationDate?: string
        isConfirmed: boolean
    }

}