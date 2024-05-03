import {usersCollection} from "../../db/mongo-db";
import {UserDbType} from "../../db/user-db-type";
import {ObjectId} from "mongodb";

export const usersMongoRepository = {
    async create(input: UserDbType) {
        return await usersCollection.insertOne(input)
    },

    async delete(id: ObjectId) {
        return await usersCollection.deleteOne({_id: id})
    }
}