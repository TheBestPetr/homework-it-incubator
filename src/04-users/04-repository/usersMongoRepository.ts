import {usersCollection} from "../../db/mongo-db";
import {UserDbType} from "../../db/user-db-type";
import {ObjectId} from "mongodb";
import {InputLoginType} from "../../types/authType";

export const usersMongoRepository = {
    async create(input: UserDbType) {
        return await usersCollection.insertOne(input)
    },

    async delete(id: string) {
        return await usersCollection.deleteOne({_id: new ObjectId(id)})
    },

    async isLoginOrEmailExist(input: InputLoginType) {
        return await usersCollection.find({$or: [{'login': input.loginOrEmail}, {'email': input.loginOrEmail}]})
    },

    async find(loginOrEmail: string) {
        return usersCollection.findOne({$or: [{'login': loginOrEmail}, {'email': loginOrEmail}]})
    }
}