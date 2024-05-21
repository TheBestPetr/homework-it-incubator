import {InputUserType, OutputUserType} from "../../types/input-output-types/user-type";
import {UserDbType} from "../../types/db-types/user-db-type";
import {usersMongoRepository} from "../04-repository/users-mongo-repository";
import {bcryptService} from "../../application/bcrypt-service/bcrypt-service";

export const usersService = {
    async createSuperUser(input: InputUserType): Promise<OutputUserType> {
        const passwordHash = await bcryptService.generateHash(input.password)
        const createdUser: UserDbType = {
            login: input.login,
            passwordHash: passwordHash,
            email: input.email,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                isConfirmed: true
            }
        }
        const insertedUser = await usersMongoRepository.create(createdUser)
        return {
            id: insertedUser.insertedId.toString(),
            login: createdUser.login,
            email: createdUser.email,
            createdAt: createdUser.createdAt
        }
    },

    async delete(id: string): Promise<boolean> {
        const result = await usersMongoRepository.delete(id)
        return result.deletedCount === 1
    }
}