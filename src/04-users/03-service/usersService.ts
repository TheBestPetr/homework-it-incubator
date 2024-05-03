import {InputUserType, OutputUserType} from "../../types/usersType";
import {UserDbType} from "../../db/user-db-type";
import {usersMongoRepository} from "../04-repository/usersMongoRepository";
import {ObjectId} from "mongodb";

export const usersService = {
    async create(input: InputUserType): Promise<OutputUserType> {
        const createdUser: UserDbType = {
            login: input.login,
            password: input.password,
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
        const ObjId = new ObjectId(id)
        const result = await usersMongoRepository.delete(ObjId)
        return result.deletedCount === 1
    }
}