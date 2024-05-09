import {userCollection} from "../../db/mongo-db";
import {UserDbType} from "../../db/user-db-type";
import {ObjectId} from "mongodb";
import {InputLoginType} from "../../types/authType";

export const usersMongoRepository = {
    async create(input: UserDbType) {
        return await userCollection.insertOne(input)
    },

    async delete(id: string) {
        return await userCollection.deleteOne({_id: new ObjectId(id)})
    },

    async isLoginOrEmailExist(input: InputLoginType) {
        return await userCollection.find({$or: [{'login': input.loginOrEmail}, {'email': input.loginOrEmail}]})
    }
}