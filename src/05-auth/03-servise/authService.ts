import {InputLoginType} from "../../types/authType";
import {bcryptService} from "../../bcryptService/bcryptService";
import {usersMongoQueryRepository} from "../../04-users/04-repository/usersMongoQueryRepository";
import {InputUserType} from "../../types/userType";
import {UserDbType} from "../../db/user-db-type";
import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";
import {usersMongoRepository} from "../../04-users/04-repository/usersMongoRepository";
import {nodemailerService} from "../../application/nodemailerService/nodemailerService";

export const authService = {
    async checkCredentials(input: InputLoginType): Promise<string | null> {
        const user = await usersMongoQueryRepository.findByLoginOrEmail(input.loginOrEmail)
        if (user) {
            const isPassCorrect = await bcryptService.checkPassword(input.password, user!.passwordHash)
            if (isPassCorrect) {
                return user._id.toString()
            }
        }
        return null
    },

    async registerUser(input: InputUserType): Promise<boolean> {
        const passwordHash = await bcryptService.generateHash(input.password)
        const createdUser: UserDbType = {
            login: input.login,
            passwordHash: passwordHash,
            email: input.email,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 2
                }).toISOString(),
                isConfirmed: false
            }
        }
        await usersMongoRepository.create(createdUser)

        nodemailerService.sendEmail(createdUser.email, 'User registration', createdUser.emailConfirmation!.confirmationCode!)
            .catch((error) => {
                console.error('Send email error', error)
            })
        return true
    },

    async confirmUserEmail(confirmationCode: string): Promise<boolean> {
        const user = await usersMongoQueryRepository.findByConfirmationCode(confirmationCode)
        if (user) {
            user.emailConfirmation.confirmationCode = undefined
            user.emailConfirmation.expirationDate = undefined
            user.emailConfirmation.isConfirmed = true
            const result = await usersMongoRepository.updateEmailStatus(user._id.toString(), user)
            return result.modifiedCount === 1
        }
        return false
    },

    async confirmUserEmailResending(email: string): Promise<boolean> {
        const user = await usersMongoQueryRepository.findByLoginOrEmail(email)
        if (user) {
            user.emailConfirmation.confirmationCode = randomUUID()
            user.emailConfirmation.expirationDate = add(new Date(), {
                hours: 1,
                minutes: 2
            }).toISOString()
            const result = await usersMongoRepository.updateEmailStatus(user._id.toString(), user)
            if (result) {
                nodemailerService.sendEmail(user.email, 'User registration', user.emailConfirmation!.confirmationCode)
                    .catch((error) => {
                        console.error(error)
                    })
            }
            return false
        }
        return true
    }
}