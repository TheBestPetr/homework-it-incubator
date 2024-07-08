export class UserClass {
    constructor(
        public login: string,
        public passwordHash: string,
        public passwordRecovery: {
            recoveryCode: string | undefined,
            expirationDate: string | undefined
        } | undefined,
        public email: string,
        public createdAt: string,
        public emailConfirmation: {
            confirmationCode: string | undefined,
            expirationDate: string | undefined
            isConfirmed: boolean
        }
    ) {
    }
}