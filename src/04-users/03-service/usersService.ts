import {InputUserType, OutputUserType} from "../../types/userType";
import {UserDbType} from "../../db/user-db-type";
import {usersMongoRepository} from "../04-repository/usersMongoRepository";
import {bcryptService} from "../../bcryptService/bcryptService";

export const usersService = {
    async create(input: InputUserType): Promise<OutputUserType> {
        const passwordHash = await bcryptService.generateHash(input.password)
        const createdUser: UserDbType = {
            login: input.login,
            passwordHash: passwordHash,
            email: input.email,
            createdAt: new Date().toISOString()
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